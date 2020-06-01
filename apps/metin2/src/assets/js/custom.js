function init_script() {

    /* Maneja el menu de Inicio de Sesión  */
    var btn_sign_in = document.getElementById("btn_sign_in");
    var sign_in = document.getElementById('sign_in');

    btn_sign_in.onclick = function() {
        sign_in.style.display = "flex";
    }

    /* Maneja el menu de administracion del usuario  */
    var btn_manager_user = document.getElementById("btn_manager_user");
    var manager_user = document.getElementById('manager_user');

    btn_manager_user.onclick = function() {
        manager_user.style.display = "flex";
    }

    /* Maneja el menu de rankings del usuario  */
    var btn_rankings_user = document.getElementById("btn_rankings_user");
    var rankings_user = document.getElementById('rankings_user');

    btn_rankings_user.onclick = function() {
        rankings_user.style.display = "flex";
    }

    /* Maneja el menu de rankings de gremios  */
    var btn_rankings_groups = document.getElementById("btn_rankings_groups");
    var rankings_groups = document.getElementById('rankings_groups');

    btn_rankings_groups.onclick = function() {
        rankings_groups.style.display = "flex";
    }

    /* Maneja el modal informativo */
    var modal_info = document.getElementById('modal_info');

    window.onclick = function(event) {
        if (event.target == manager_user) {
            manager_user.style.display = "none";
        }
        if (event.target == rankings_user) {
            rankings_user.style.display = "none";
        }
        if (event.target == rankings_groups) {
            rankings_groups.style.display = "none";
        }
        if (event.target == modal_info) {
            modal_info.style.display = "none";
        }
        if (event.target == sign_in) {
            sign_in.style.display = "none";
        }
    }
}

