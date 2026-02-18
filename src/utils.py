import os
import sys

def get_resource_path(relative_path):
    """PyInstallerの一時フォルダから絶対パスを取得する """
    if hasattr(sys, '_MEIPASS'):
        # 実行ファイル展開先のパス
        return os.path.join(sys._MEIPASS, relative_path)
    # 通常実行（開発時）のパス
    return os.path.join(os.path.abspath("."), relative_path)
