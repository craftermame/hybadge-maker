# Hybadge Maker

## Release の作成方法

Release は現在の main ブランチに基づいて作成します。

`git tag vX.X.X` でタグを作成した後、`git push origin vX.X.X` を実行することで自動的に全プラットフォーム向けの Release が作成されます（`git tag` はローカルのタグを作成するだけなので、明示的に push する必要がある）。

また、`git tag -a vX.X.X -m "..."` で注釈付きタグを作成できます。

### コマンドの実行例

```sh
git switch 
git pull origin main
git tag -a v1.0.0 -m "Initial Release"
git push origin v1.0.0
```

> [!NOTE]
> もし、タグを間違えて作成した場合は以下のようにします。
> 
> ```sh
> git tag -d vX.X.X
> git push origin -d vX.X.X
> ```
>
> その後、GitHub の UI 上から Release を削除してください。
