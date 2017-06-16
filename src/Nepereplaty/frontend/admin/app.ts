

/* App definitions */

/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../../typings/angularjs/angular-cookies.d.ts" />
/// <reference path="../../typings/angularjs/angular-sanitize.d.ts" />
/// <reference path="../../typings/angular-translate/angular-translate.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

/* App initialization */

/// <reference path="init.ts" />

/* App components */
/// <reference path="main/main.controller.ts" />
/// <reference path="menu/menu.controller.ts" />
/// <reference path="closeoffers/closeoffers.controller.ts" />
/// <reference path="onpurchasoffers/onpurchasoffers.controller.ts" />
/// <reference path="offer/offer.controller.ts" />
/// <reference path="adminaccount/adminaccount.controller.ts" />
/// <reference path="company/company.controller.ts" />
/// <reference path="createcompany/createcompany.controller.ts" />
/// <reference path="login/login.controller.ts" />

/// <reference path="admin.service.ts" />


/// <reference path="config.ts" />
/// <reference path="routes.ts" />
interface JQuery {
    dataTable: any;
}
function createTable() {
    $('.datatables').dataTable({
        'sDom': '<\'row\'<\'col-xs-6\'l><\'col-xs-6\'f>r>t<\'row\'<\'col-xs-6\'i><\'col-xs-6\'p>>',
        'sPaginationType': 'bootstrap',
        'aaSorting': [[0, 'desc']],
        'oLanguage': {
            'sLengthMenu': '_MENU_ записей в странице',
            'sSearch': ''
        }
    });
    $('.dataTables_filter input').addClass('form-control').attr('placeholder', 'поиск...');
    $('.dataTables_length select').addClass('form-control');
}