import style from "./LoadingBar.module.css";

const LoadingBar = () => {
  return (
    <section className={style.loading}>
      <p>Carregando...</p>
      <div className={style.loadingBar}>
        <div className={style.loadingBarCase}>
          <div className={style.loadingBarFill} />
        </div>
      </div>
    </section>
  );
};

export default LoadingBar;