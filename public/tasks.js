/**
 * Realiza uma requisição GET para obter a lista de tarefas do servidor e exibe as tarefas na página.
 * @function
 * @returns {void}
 */
// tasks.js
document.addEventListener('DOMContentLoaded', function () {
  // Realiza uma requisição GET para obter a lista de tarefas do servidor
  fetch('/api/tasks')
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('taskList');

      // Limpa a lista de tarefas antes de adicionar as novas
      taskList.innerHTML = '';

      // Adiciona cada tarefa à lista
      tasks.forEach(task => {
        const listItem = document.createElement('li');
        
        // Cria um link para a visualização da tarefa
        const taskLink = document.createElement('a');
        taskLink.href = `/task/${task.id}`;
        taskLink.textContent = `${task.title} - ${task.completed ? 'Concluída' : 'Pendente'}`;
        
        listItem.appendChild(taskLink);
        taskList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Erro ao obter lista de tarefas:', error));
});

/**
 * Função para EXCLUIR uma tarefa.
 * @param {string} taskId - O ID da tarefa a ser excluída.
 */
const deleteTask = (taskId) => {
    if (!confirm('Tem certeza de que deseja excluir esta tarefa?')) {
        return; // Sai se o usuário cancelar
    }

    fetch(`/api/task/${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Não foi possível excluir a tarefa.');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        // Recarrega a lista após a exclusão
        loadTasks(); 
    })
    .catch(error => console.error('Erro ao excluir tarefa:', error));
};

/**
 * Realiza uma requisição GET para obter a lista de tarefas do servidor e exibe as tarefas na página.
 * @function
 * @returns {void}
 */
const loadTasks = () => { // Transformamos a lógica em uma função para poder recarregar
    // Realiza uma requisição GET para obter a lista de tarefas do servidor
    fetch('/api/tasks')
    .then(response => response.json())
    .then(tasks => {
        const taskList = document.getElementById('taskList');

        // Limpa a lista de tarefas antes de adicionar as novas
        taskList.innerHTML = '';

        // Adiciona cada tarefa à lista
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.style.display = 'flex'; // Adiciona um estilo para alinhar os elementos
            listItem.style.justifyContent = 'space-between'; // Distribui o espaço
            listItem.style.alignItems = 'center'; // Centraliza verticalmente

            // 1. Link para Visualização
            const taskLink = document.createElement('a');
            taskLink.href = `/task/${task.id}`;
            taskLink.textContent = `${task.title} - ${task.completed ? 'Concluída' : 'Pendente'}`;
            taskLink.style.marginRight = '10px'; // Espaçamento

            // 2. Botão de Editar
            const editButton = document.createElement('a');
            editButton.href = `/tasks/edit/${task.id}`; // Leva para a nova página de edição
            editButton.textContent = 'Editar';
            editButton.className = 'botao editar'; // Adicione a classe 'botao' do seu CSS
            editButton.style.marginRight = '5px';

            // 3. Botão de Excluir
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.className = 'botao excluir'; // Adicione a classe 'botao' do seu CSS
            deleteButton.onclick = () => deleteTask(task.id); // Adiciona o evento de clique

            listItem.appendChild(taskLink);
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Erro ao obter lista de tarefas:', error));
};

document.addEventListener('DOMContentLoaded', loadTasks); // Chama a função no carregamento