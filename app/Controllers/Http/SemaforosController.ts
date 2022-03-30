
import Database from "@ioc:Adonis/Lucid/Database";
import Semaforo from "App/Models/Semaforo";
import axios from "axios";

export default class SemaforosController {
    //get
  public async index({}) {
    try {
      const result = await Database.query()
        .from("reportes_semaforos.semaforos")
        .select("*");
      return result;
    } catch (error) {
      return "error" + TypeError;
    }
  }
  //post
  public async store({ request, response }) {
    await Database.transaction(async (trx) => {
      try {
        const body = request.all();
        let datos = JSON.parse(body.data);
        let ImgDatos = {
          imagenes: JSON.stringify(datos.imagenes),
          obra: datos.obra,
          correo: datos.correo,
        };
        let datosHueco = {
          description: datos.description,
          latitude: datos.latitude,
          longitude: datos.longitude,
          location: datos.location,
          correo: datos.correo,
        };

        //http://10.2.0.111:3005
        //http://10.2.0.111:3005

        const config = {
          method: "POST",
          url: "http://201.184.171.13:8888/imagenes-reportesmed",
          headers: {}, //'Content-Type': 'application/x-www-form-urlencoded'
          data: ImgDatos,
        };
        let rutaImagen = "";
        //@ts-ignore
        await axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            rutaImagen = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
        //@ts-ignore
        datosSemaforo.rutaImagen = rutaImagen;
        let semaforo = new Semaforo();
        semaforo.fill(datosHueco);
        semaforo.useTransaction(trx);
        await semaforo.save();

        let id_reporte = semaforo.$getAttribute("id_reporte");

        await trx.commit();
        response.status(201);
        response.send(id_reporte);
      } catch (error) {
        await trx.rollback();
        response.status(400);
        response.send({ message: `${error.message}` });
      }
    });
  }
}
