# パッケージインストールコマンド
pip install -r requirements.txt
# マイグレーション
python manage.py migrate
# 静的ファイルの収集
python manage.py collectstatic --noinput

