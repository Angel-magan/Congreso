import Card from "../../components/Card/CardJob";
import CardRegister from "../../components/Card/CardRegister";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <p className="text-center fw-bold fs-3 m-0">
          ¡Hola, <span>xxxxxxx</span>!
        </p>
        <section className="border border-primary border-2 p-3 m-4 rounded">
          <h3 className="border-bottom border-primary border-3 mx-2 w-25">
            Programación
          </h3>
          <div className="d-flex justify-content-center mb-2">
            <Card
              titleJob={"Titulo del trabajo"}
              date={"DD/MM/YYYY"}
              clock={"2:30 PM"}
              hall={"Sala 1"}
              chairman={"Juan Peréz"}
              ponente={"Juan Peréz"}
            />
            <Card
              titleJob={"Titulo del trabajo"}
              date={"DD/MM/YYYY"}
              clock={"2:30 PM"}
              hall={"Sala 1"}
              chairman={"Juan Peréz"}
              ponente={"Juan Peréz"}
            />
          </div>
          <div className="d-flex justify-content-center mb-2">
            <Card
              titleJob={"Titulo del trabajo"}
              date={"DD/MM/YYYY"}
              clock={"2:30 PM"}
              hall={"Sala 1"}
              chairman={"Juan Peréz"}
              ponente={"Juan Peréz"}
            />
            <Card
              titleJob={"Titulo del trabajo"}
              date={"DD/MM/YYYY"}
              clock={"2:30 PM"}
              hall={"Sala 1"}
              chairman={"Juan Peréz"}
              ponente={"Juan Peréz"}
            />
          </div>
        </section>
        <div className="m-4">
          <CardRegister
            question={"¿Quieres er parte de este evento?"}
            register={"Registrate como congresista"}
            link={"registerCongressman"}
          />
          <CardRegister
            question={"¿Eres autor de un trabajo?"}
            register={"Registrate como autor"}
            link={"registerAuthor"}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
