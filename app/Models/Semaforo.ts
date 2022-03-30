import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Semaforo extends BaseModel {
  public static table = 'reportes_semaforos.semaforos'
  @column({ isPrimary: true })
  public id_reporte: number

  @column({columnName:'direccion'})
  public location: string

  @column({columnName:'punto_referencia'})
  public description: string

  @column({columnName:'x'})
  public longitude: string

  @column({columnName:'y'})
  public latitude: string

  @column({columnName:'correo_persona'})
  public correo: string 

  @column({columnName:'ruta_imagen'})
  public rutaImagen: String

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public fecha: DateTime
}
