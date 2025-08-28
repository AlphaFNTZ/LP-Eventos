import style from "./TableLine.module.css";

interface TableLineProps {
  className: string;
  content: string;
  description?: string;
}

const TableLine: React.FC<TableLineProps> = () => {
  return (
    <section className={style.container}>
      <div className={style.horario}></div>
      <span>{'"> "'}</span>
      <div className={style.descricao}></div>
    </section>
  );
};

export default TableLine;