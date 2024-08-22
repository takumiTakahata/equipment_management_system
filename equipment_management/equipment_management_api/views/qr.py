import os
import logging
import json
import base64
from io import BytesIO
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import qrcode
from PIL import Image, ImageDraw, ImageFont
from PyPDF2 import PdfWriter, PdfReader
from django.conf import settings

# ログの設定
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_qr_codes(data_list):
    qr_codes = []
    for data in data_list:
        logger.info(f"Generating QR code for data: {data}")
        
        # QRコードを生成
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(data)
        qr.make(fit=True)
        
        # QRコードをPILイメージとして生成
        img = qr.make_image(fill_color="black", back_color="white")
        logger.info("QR code image generated")

        # 画像をBytesIOオブジェクトに保存
        buffered = BytesIO()
        img.save(buffered, format="PNG")
        logger.info("QR code image saved to BytesIO")

        # BytesIOオブジェクトをbase64エンコードして配列に格納
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        qr_codes.append(img_str)
        logger.info("QR code image encoded to base64 and added to list")

    return qr_codes

def generate_pdf(qr_codes, names):
    pdf_writer = PdfWriter()
    page_width, page_height = 595, 842  # A4サイズ
    margin = 50
    qr_size = 100
    spacing = 20
    font_size = 12

    # 日本語フォントの設定
    try:
        font_path = os.path.join(settings.BASE_DIR, 'equipment_management_api', 'fonts', 'NotoSansJP-Regular.ttf')
        font = ImageFont.truetype(font_path, font_size)
        logger.info(f"Font loaded successfully from {font_path}")
    except IOError:
        font = ImageFont.load_default()
        logger.error(f"Failed to load font from {font_path}, using default font")

    # 1ページに収まるQRコードの数を計算
    num_cols = (page_width - 2 * margin) // (qr_size + spacing)
    num_rows = (page_height - 2 * margin) // (qr_size + spacing + font_size)

    for page_start in range(0, len(qr_codes), num_cols * num_rows):
        page_img = Image.new('RGB', (page_width, page_height), color=(255, 255, 255))
        draw = ImageDraw.Draw(page_img)

        for i, (qr_code, name) in enumerate(zip(qr_codes[page_start:], names[page_start:])):
            if i >= num_cols * num_rows:
                break

            col = i % num_cols
            row = i // num_cols

            x = margin + col * (qr_size + spacing)
            y = margin + row * (qr_size + spacing + font_size)

            # QRコード画像を貼り付け
            img_data = base64.b64decode(qr_code)
            img_buffer = BytesIO(img_data)
            qr_img = Image.open(img_buffer)
            qr_img = qr_img.resize((qr_size, qr_size))
            page_img.paste(qr_img, (x, y))

            # 名前を描画
            text_bbox = draw.textbbox((0, 0), name, font=font)
            text_width = text_bbox[2] - text_bbox[0]
            text_x = x + (qr_size - text_width) // 2
            text_y = y + qr_size + 5
            draw.text((text_x, text_y), name, fill="black", font=font)

        # ページをPDFに変換
        page_pdf_buffer = BytesIO()
        page_img.save(page_pdf_buffer, format="PDF")
        page_pdf_buffer.seek(0)
        pdf_writer.add_page(PdfReader(page_pdf_buffer).pages[0])

    # バッファからPDFデータを取得
    pdf_buffer = BytesIO()
    pdf_writer.write(pdf_buffer)
    pdf_buffer.seek(0)
    return pdf_buffer.getvalue()

@csrf_exempt
def qr_code_view(request):
    if request.method == 'POST':
        try:
            logger.info("Received POST request")
            body = json.loads(request.body)
            names = body.get('buttonValue')
            button_id = body.get('buttonId')
            
            if not names or not button_id:
                logger.error("Invalid input: buttonValue or buttonId is missing")
                return JsonResponse({'error': 'Invalid input'}, status=400)
            
            logger.info(f"Data list for QR code generation: {button_id}")
            qr_codes = generate_qr_codes(button_id)
            
            logger.info("QR codes generated successfully")
            pdf = generate_pdf(qr_codes, names)
            
            response = HttpResponse(pdf, content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="qr_codes.pdf"'
            return response
        except json.JSONDecodeError:
            logger.error("Invalid JSON received")
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        logger.error("Invalid request method")
        return JsonResponse({'error': 'Invalid request method'}, status=405)
