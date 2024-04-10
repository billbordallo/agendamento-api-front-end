/*
--------------------------------------------------------------------------------------
Função para inserir um novo agendamento via requisição POST
--------------------------------------------------------------------------------------
*/
const postItem = async (inputNomeCliente, inputEmailCliente, inputCelularCliente, inputEnderecoCliente, inputDataCliente, inputHoraCliente, inputServicoCliente, inputMensagemCliente, inputStatusAgendamento) => {
    const formData = new FormData();
    formData.append('nome_cliente', inputNomeCliente);
    formData.append('email_cliente', inputEmailCliente);
    formData.append('celular_cliente', inputCelularCliente);
    formData.append('endereco_cliente', inputEnderecoCliente);
    formData.append('data_cliente', inputDataCliente);
    formData.append('hora_cliente', inputHoraCliente);
    formData.append('servico_cliente', inputServicoCliente);
    formData.append('mensagem_cliente', inputMensagemCliente);
    formData.append('status_agendamento', inputStatusAgendamento);
  
    let url = 'http://127.0.0.1:5000/agendamento';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => {
        console.log(response)
          if (response.status === 200) {
            response.json()
          }
          if (!response.ok) {
              return response.json().then(errorData => {
                  console.log(errorData)
                  alert(errorData.mesage);
              });
          }
          if (response.status === 409) {
              return response.json().then(errorData => {
                  console.log(errorData)
                  alert('Error 409: ' + errorData.mesage);
              });
          }
          if (response.status === 422) {
            return response.json().then(errorData => {
                console.log(errorData)
                alert('Error 422: ' + errorData.mesage);
            });
        }
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // No form #form-agendamento adicione prevent default e dê um console.log() com os valores dos campos
document.getElementById('form-agendamento').addEventListener('submit', function(event) {
    event.preventDefault();

    let inputNomeCliente = document.getElementById("nome_cliente").value;
    let inputEmailCliente = document.getElementById("email_cliente").value;
    let inputCelularCliente = document.getElementById("celular_cliente").value;
    let inputEnderecoCliente = document.getElementById("endereco_cliente").value;
    let inputDataCliente = document.getElementById("data_cliente").value;
    let inputHoraCliente = document.getElementById("hora_cliente").value;
    let inputServicoCliente = document.querySelector('input[name="servico_cliente"]:checked').value;
    let inputMensagemCliente = document.getElementById("mensagem_cliente").value;
    let inputStatusAgendamento = document.getElementById("status_agendamento").value;
    

  if (inputNomeCliente === '') {
    alert("Informe seu nome");
  } else if (inputEmailCliente === '') {
    alert("Informe seu e-mail");
  } else if (inputCelularCliente === '') {
    alert("Informe seu celular");
  } else if (inputEnderecoCliente === '') {
    alert("Informe seu endereço");
  } else if (inputDataCliente === '') {
    alert("Selecione uma data");
  } else if (inputHoraCliente === '') {
    alert("Selecione um horário");
  } else if (inputServicoCliente === '') {
    alert("Selecione um serviço");
  } else {
    postItem(inputNomeCliente, inputEmailCliente, inputCelularCliente, inputEnderecoCliente, inputDataCliente, inputHoraCliente, inputServicoCliente, inputMensagemCliente, inputStatusAgendamento)
    // Escondo o formulário
    document.getElementById('form-agendamento').style.display = 'none';
    // Carrego os dados enviados para exibir um resumo do agendamento
    document.getElementById('nome_cliente_resumo').innerHTML = inputNomeCliente;
    document.getElementById('email_cliente_resumo').innerHTML = inputEmailCliente;
    document.getElementById('celular_cliente_resumo').innerHTML = inputCelularCliente;
    document.getElementById('endereco_cliente_resumo').innerHTML = inputEnderecoCliente;
    document.getElementById('data_cliente_resumo').innerHTML = inputDataCliente;
    document.getElementById('hora_cliente_resumo').innerHTML = inputHoraCliente;
    document.getElementById('servico_cliente_resumo').innerHTML = inputServicoCliente;
    document.getElementById('mensagem_cliente_resumo').innerHTML = inputMensagemCliente;
    document.getElementById('status_agendamento_resumo').innerHTML = inputStatusAgendamento;
    // Removo o elemento #section-form
    document.getElementById('section-form').style.display = 'none';
    // Exibir a mensagem de confirmação
    document.getElementById('confirmacao').style.display = 'block';
  }
});

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de serviços oferecidos do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getServicosList = async () => {
  let url = 'http://127.0.0.1:5001/servicos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.servicos.forEach(item => insertNewServico(item.nome_servico, item.desc_servico, item.duracao_servico, item.valor_servico))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
// Chamada inicial para carregamento dos dados
getServicosList();

/*
  --------------------------------------------------------------------------------------
  Função carregar os serviços oferecidos no formulário
  --------------------------------------------------------------------------------------
*/
const insertNewServico = (nome_servico, desc_servico, duracao_servico, valor_servico) => {
  var servicosCliente = document.getElementById('servico_cliente');

  // Verifique se a opção já existe
  for (var i = 0; i < servicosCliente.length; i++) {
    if (servicosCliente[i].value === nome_servico) {
      // A opção já existe, então retorne para sair da função
      return;
    }
  }

  // Se chegamos aqui, a opção não existe, então criamos os elementos para exibir os serviços e as informações adicionais
  var inputRadio = document.createElement('input');
  inputRadio.type = 'radio';
  inputRadio.value = nome_servico;
  inputRadio.name = 'servico_cliente';
  var nome_servico_id = nome_servico.replace(/[^a-zA-Z0-9]/g, '');
  inputRadio.id = nome_servico_id;

  var label = document.createElement('label');
  var breakRow = document.createElement('br');
  label.textContent = nome_servico;
  label.htmlFor = inputRadio.id;
  var info = document.createElement('p');
  info.textContent =  '' + desc_servico + ' | Duração: ' + duracao_servico + ' | Valor: R$ ' + valor_servico + '';
  servicosCliente.appendChild(inputRadio);
  servicosCliente.appendChild(label);
  servicosCliente.appendChild(breakRow);
  servicosCliente.appendChild(info);
  servicosCliente.appendChild(breakRow);
}