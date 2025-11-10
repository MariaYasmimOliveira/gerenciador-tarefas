
document.addEventListener('DOMContentLoaded', function () {
    const editTaskForm = document.getElementById('editTaskForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const completedInput = document.getElementById('completed');

    // 1. Obtém o ID da tarefa da URL (ex: /tasks/edit/3)
    const taskId = window.location.pathname.split('/').pop();

    // Função para carregar os dados da tarefa no formulário
    const loadTaskData = () => {
        fetch(`/api/task/${taskId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível obter os detalhes da tarefa para edição.');
                }
                return response.json();
            })
            .then(task => {
                // Preenche os campos do formulário com os dados atuais
                titleInput.value = task.title;
                descriptionInput.value = task.description;
                completedInput.checked = task.completed;
            })
            .catch(error => {
                console.error('Erro ao carregar dados da tarefa:', error);
                alert('Erro ao carregar os dados da tarefa.');
            });
    };

    // 2. Manipula o envio do formulário
    editTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Dados atualizados da tarefa
        const updatedTask = {
            title: titleInput.value,
            description: descriptionInput.value,
            completed: completedInput.checked,
        };

        // Envia a requisição PUT para a rota de atualização
        fetch(`/api/task/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar as edições da tarefa.');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            // Redireciona para a página de visualização da tarefa ou lista de tarefas
            window.location.href = `/task/${taskId}`; 
        })
        .catch(error => {
            console.error('Erro ao editar tarefa:', error);
            alert('Não foi possível salvar as edições.');
        });
    });

    // Carrega os dados da tarefa ao iniciar a página
    loadTaskData();
});