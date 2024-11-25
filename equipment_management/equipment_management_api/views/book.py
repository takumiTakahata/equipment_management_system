from django.http import JsonResponse
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
import os
from dotenv import load_dotenv

load_dotenv()

class BookAPIView:
    def get(self, request, isbn):
        if not isbn:
            return JsonResponse({'error': 'ISBNが提供されていません'}, status=400)

        # OpenBDのAPIエンドポイント
        url = f'https://api.openbd.jp/v1/get?isbn={isbn}'

        try:
            # OpenBD APIへのリクエスト
            response = requests.get(url)
            response.raise_for_status()

            # レスポンスを解析
            data = response.json()

            # データが存在しない場合
            if not data or data[0] is None:
                return JsonResponse({'error': '本が見つかりませんでした'}, status=404)

            # 必要な情報を取得
            book_data = data[0]['summary']
            if 'title' in book_data:
                return JsonResponse({'title': book_data['title']})
            else:
                return JsonResponse({'error': 'タイトル情報が見つかりませんでした'}, status=404)
        except requests.RequestException as e:
            print("APIリクエスト中にエラーが発生しました:", e)
            return JsonResponse({'error': 'APIリクエスト中にエラーが発生しました'}, status=500)
