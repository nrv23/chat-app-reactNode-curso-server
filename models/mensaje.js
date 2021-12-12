const { Schema, model } = require("mongoose");

const MensajeSchema = Schema(
  {
    de: {
      // la persona que envia el mensaje

      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    para: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    mensaje: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // guardar los datos de creado y editado en la coleccion
  }
);

MensajeSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Mensaje", MensajeSchema);
