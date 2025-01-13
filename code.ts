
// 現在選択されているオブジェクトを取得
const selection = figma.currentPage.selection;

// 選択されたオブジェクトが存在しない場合の処理
if (selection.length === 0) {
  // ユーザーにフレームが未選択であることを通知
  figma.notify("Please select a frame.");
  // プラグインを終了
  figma.closePlugin();
} else {
  // 処理したフレームの数をカウント
  let processedCount = 0;

  // 選択された各ノードに対してループ処理を実行
  selection.forEach(node => {
    // 現在のノードがフレーム（FRAME）であるかをチェック
    if (node.type === "FRAME") {
      // 型アサーション: 現在のノードを FrameNode として扱う
      const frameNode = node as FrameNode;

      // Auto Layout のプロパティが存在し、レイアウトモードが "NONE" でない場合
      if ("layoutMode" in frameNode && frameNode.layoutMode !== "NONE") {
        // フレームの strokesIncludedInLayout プロパティを true に設定
        // （境界線もレイアウト計算に含める仕様を適用）
        frameNode.strokesIncludedInLayout = true;

        // 処理が成功したフレームのカウントを増加
        processedCount++;
      }
    }
  });

  // 処理されたフレームが 1 件以上ある場合
  if (processedCount > 0) {
    // 処理したフレーム数を通知メッセージに含めてユーザーに通知
    figma.notify(`Updated layout settings for ${processedCount} frame(s).`);
  } else {
    // 選択されたノードに有効なフレームが含まれていない場合に通知
    figma.notify("There are no valid frames in the selected nodes.");
  }

  // プラグインの処理を終了
  figma.closePlugin();
}