import html from "html-literal";

export default (st) => html`
  <section id="gallery">
    ${st.pictures.reduce(
      (html, pic) => html + `<img src="${pic.url}" alt="${pic.title}">`,
      ``
    )}
  </section>
`;
