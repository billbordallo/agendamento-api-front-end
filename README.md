# API do sistema de agendamentos
_versão: 1.0_

Este repositório contém o microsserviço referente ao front-end de agendamento do MVP para a Sprint _Desenvolvimento Back-End Avançado_, da PUC-RIO.

Trata-se de um sistema de agendamento de clientes para profissionais liberais. O sistema completo engloba quatro microsserviços, cada um com seu próprio repositório.

## Repositórios necessários para rodar a aplicação

Para rodar o sistema completo, é necessário clonar os 4 repositórios, localizados em:

- **Repositório 1** - agendamento-api-front-end-admin: é a interface principal, que será utilizada pelo profissional liberal. Nele, é possível visualizar os agendamentos existentes, confirmar ou não a data, e inserir o compromisso no Google Agenda, através da API do mesmo.

- **Repositório 2** - [agendamento-api-back-end-admin](https://github.com/billbordallo/agendamento-api-back-end-admin): contém uma API com o back-end do sistema de administração e se comunica com o Repositório 1. Contém os bancos de dados referentes à autenticação do usuário (profissional liberal) e a tabela de serviços oferecidos.

- **Repositório 3** (**este repositório**) - agendamento-api-front-end: é a interface pela qual os clientes do profissional liberal poderão realizar agendamentos. O sistema vai informar se o horário desejado está liberado ou não para agendamento.

- **Repositório 4** - [agendamento-api-back-end](https://github.com/billbordallo/agendamento-api-back-end): contém uma API com o back-end do sistema de agendamentos e se comunica com o Repositório 3. Contém o banco de dados com os agendamentos realizados, informações do cliente que realizou o agendamento (nome, telefone, e-mail, endereço, serviço desejado, dia e hora desejados), bem como o status do agendamento.

## Como instalar e executar este repositório usando o Docker

Para rodar este repositório usando o Docker (método recomendado), após clonar o mesmo, siga os passos:

1. Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

2. Navegue até o diretório que contém o `Dockerfile` e o `requirements.txt` no terminal.

3. Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t agendamento-api-front-end .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run -p 3000:3000 agendamento-api-front-end
```

Uma vez executando, para acessar a API, basta abrir o [http://localhost:3000/#/](http://localhost:3000/#/) no navegador.

## Como rodar este repositório sem usar o Docker

Por se tratar de um site estático, contendo apenas HTML, CSS e Javascript, você também pode clonar o repositório em seu computador e abrir o arquivo `index.html` em seu navegador preferido.

Lembre-se, no entanto, que para ter acesso a todos os recusos do projeto, é necessário ter os quatro repositórios rodando simultaneamente em seu ambiente local.

## Sobre o projeto

Este MVP foi desenvolvido por Fabiano Bordallo como trabalho final para a Sprint "Desenvolvimento Full Stack Avançado", da Pós-Graduação em Desenvolvimento Full Stack, do Departamento de Informática da PUC-Rio.