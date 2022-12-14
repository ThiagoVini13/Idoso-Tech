const URL = 'http://localhost:3000/videos'

window.onload = () => {

  carregarVideos();
};
// CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM PRODUTO
const videoForm = document.getElementById('video-form');

videoForm.addEventListener('submit', (e) => {
  // RECUPERA O ID DO VIDEO
  let id = parseInt($('#edit-video-id').text());

  // RECUPERA OS DADOS DO PRODUTO
  const video = JSON.stringify({
    id: document.getElementById('video-id').value,
    nome: document.getElementById('video-nome').value,
    descricao: document.getElementById('video-descricao').value,
    url: document.getElementById('video-url').value
  })

  if (id >= 0) {
    fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: video
    })
      .then(res => res.json())
      .then(() => location.reload());
  }
  else {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: video
    })
      .then(res => res.json())
      .then(() => location.reload());
  }
})

// PROCEDIMENTO PARA RECUPERAR OS DADOS DE UM PRODUTO NA API
function getVideo(id) {
  if (id == 0) {
    $('#edit-video-id').text("");
    $("#video-id").prop("disabled", false);
    $('#video-id').val("");
    $('#video-nome').val("");
    $('#video-descricao').val("");
    $('#video-url').val("");
  } else {
    $('#edit-video-id').text(id);
    fetch(`${URL}/${id}`).then(res => res.json())
      .then(data => {
        $("#video-id").prop("disabled", true);
        $('#video-id').val(data.id);
        $('#video-nome').val(data.nome);
        $('#video-descricao').val(data.descricao);
        $('#video-url').val(data.url);
      });
  }
}

const videoDelete = document.getElementById('btn-delete');

videoDelete.addEventListener('click', (e) => {

  let id = $('#id-video').text();
  fetch(`${URL}/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(() => location.reload());
})

// GET - Recupera todos os videos e adiciona na tabela
const carregarVideos = () => {

  fetch(URL)
    .then((resposta) => {
      if (resposta.ok && resposta.status === 200) {

        resposta.json().then(videos => {
          const videosList = document.getElementById('lista-videos');
          let celulas = "";

          videos.forEach((video) => {
            celulas +=
              `<tr>
                          <th scope="row">${video.id ? video.id : ""}</th>
                          <td>${video.nome ? video.nome : ""}</td>
                          <td>${video.descricao ? video.descricao : ""}</td>
                          <td>${video.url ? video.url : ""}</td>
                          <td>
                          <a onclick="getVideo(${video.id});" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal3" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" /></svg> Editar</a>
                          </td>
            
                         <td>
                              <a onclick="$('#id-video').text(${video.id});"  class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal2" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path
                                  d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                              </svg> Deletar</a>
                         </td>

                    </tr>`;

          });
          videosList.innerHTML = celulas;
        })

      }
    })
}

