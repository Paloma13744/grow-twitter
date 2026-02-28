import React from "react";

const topicos = [
  {
    category: "Esportes · há 45 min",
    title: "Assunto sobre esportes",
  },
  {
    category: "Assunto do Momento no Brasil",
    title: "Assunto sobre Música",
  },
  {
    category: "Cinema · Assunto do Momento",
    title: "Assunto sobre Filmes e Cinema",
  },
];

const Card = () => {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>O que está acontecendo?</h3>

      {topicos.map((item, index) => (
        <div key={index} style={styles.item}>
          <span style={styles.category}>{item.category}</span>
          <p style={styles.text}>
            <b>{item.title}</b>
          </p>
        </div>
      ))}

      <a href="#" style={styles.showMore}>
        Mostrar mais
      </a>
    </div>
  );
};

const styles = {
  container: {
    padding: "8px 0",
    fontFamily: "var(--font-family)",
    color: "var(--font-color)",
  },

  title: {
    marginBottom: 8,
    paddingLeft: 12,
    fontSize: "16px",
    fontWeight: "700",
  },

  item: {
    padding: "10px 12px",
    cursor: "pointer",
    transition: "0.2s",
  },

  category: {
    fontSize: "12px",
    color: "gray",
  },

  text: {
    margin: "2px 0 0 0",
    fontSize: "14px",
  },

  showMore: {
    padding: "10px 12px",
    display: "inline-block",
    fontSize: "14px",
    textDecoration: "none",
    color: "var(--color-blue-light)",
    fontWeight: 500,
    cursor: "pointer",
  },
};

export default Card;