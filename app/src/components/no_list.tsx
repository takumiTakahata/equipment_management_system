function createNoList(id: number, name: string, deadline: string) {
  return {
    id, //備品id
    name, //備品名
    deadline, //返却期限
  };
}

const data: [number, string, string][] = [
  [1, "ITパスポート", "3ヶ月"],
  [2, "基本情報", "1ヶ月"],
  [3, "応用情報", "1ヶ月"],
];

const rows = data.map((item) => {
  return createNoList(...item);
});

function NoList() {
  return (
    <div>
      <h2>ないものリスト</h2>
    </div>
  );
}

export default NoList;
