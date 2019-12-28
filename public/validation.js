$(document).ready(function() {

  $("#form").validate({
      wrapper: "div",
      rules: {
          quotation: {
              required: true,
          },
          amount: {
              required: true,
          }
      },
      messages: {
          quotation: {
            required: "Por favor, preencha a cotação de dólar"
          },
          amount: {
              required: "Por favor, preencha a quantidade de dólares",
          }
      },
  });

});