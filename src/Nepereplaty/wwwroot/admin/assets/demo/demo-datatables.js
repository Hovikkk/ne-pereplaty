// -------------------------------
// Initialize Data Tables
// -------------------------------

$(document).ready(function () {

    setTimeout(createTable, 500);

    function createTable() {
        console.log('--------------');
        $('.datatables').dataTable({
            "sDom": "<'row'<'col-xs-6'l><'col-xs-6'f>r>t<'row'<'col-xs-6'i><'col-xs-6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_ записей в странице",
                "sSearch": ""
            }
        });
        $('.dataTables_filter input').addClass('form-control').attr('placeholder','поиск...');
        $('.dataTables_length select').addClass('form-control');
    }

}
    

);