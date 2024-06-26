export let MENU_ITEM = [
    { 
        path: 'index',
        title: 'Dashboard',
        icon: 'dashboard' 
    },
    {
        path: 'customer-list',
        title: 'Customer List',
        icon: 'list'
    },
    {
        path: 'subscription-plan-payment',
        title: 'Subscription Plan Payment',
        icon: 'database'
    },
    {
        path: 'configuration',
        title: 'Configuration',
        icon: 'gear',
        children: [
            {
                path: 'tax-master',
                title: 'Tax Master'
            },
            {
                path: 'subscription-plan',
                title: 'Subscription Plan'
            },
            {
                path: 'currency-master',
                title: 'Currency Master'
            }
        ]
    },    
    {
        path: 'profile',
        title: 'User Profile',
        icon: 'user'
    },
    {
        path: 'reciept-category',
        title: 'Category',
        icon: 'file'
    },
    {
        path: 'generate-bill-reciept',
        title: 'Generate Reciept',
        icon: 'file'
    },
    {
        path: 'customer-bill-reciept',
        title: 'Customer Bill Reciept',
        icon: 'file'
    },
    {
        path: 'login',
        title: 'Logout',
        icon: 'sign-out'
    },
     {
        path: 'editor',
        title: 'Pell Editor',
        icon: 'pencil'
    },
       {
        path: 'table',
        title: 'Tables',
        icon: 'table',
        children: [
            {
                path: 'basic-tables',
                title: 'Basic Tables'
            },
            {
                path: 'data-table',
                title: 'Data Table'
            }
        ]
    }, 
   {
        path: 'icon',
        title: 'Icon',
        icon: 'diamond'
    },
     {
        path: 'ui',
        title: 'UI Element',
        icon: 'paint-brush',
        children: [
            {
                path: 'grid',
                title: 'Bootstrap Grid'
            },
            {
                path: 'buttons',
                title: 'Buttons'
            },
            {
                path: 'notification',
                title: 'Notification'
            },
            {
                path: 'tabs',
                title: 'Tabs'
            },
            {
                path: 'file-tree',
                title: 'File Tree'
            },
            {
                path: 'modals',
                title: 'Modals'
            },
            {
                path: 'progress-bar',
                title: 'ProgressBar'
            },
              {
                 path: 'loading',
                 title: 'Loading'
             }, 
        ]
    },
    {
        path: 'form',
        title: 'Forms',
        icon: 'check-square-o',
        children: [
            {
                path: 'form-inputs',
                title: 'Form Inputs'
            },
            {
                path: 'form-layouts',
                title: 'Form Layouts'
            },
            {
                path: 'file-upload',
                title: 'File Upload'
            },
            {
                path: 'ng2-select',
                title: 'Ng2-Select'
            }
        ]
    },
    {
        path: 'charts',
        title: 'Charts',
        icon: 'bar-chart',
        children: [
            {
                path: 'echarts',
                title: 'Echarts'
            }
        ]
    },     
    {
        path: 'menu-levels',
        title: 'Menu Levels',
        icon: 'sitemap',
        children: [
            {
                path: 'levels1',
                title: 'Menu Level1',
                children: [
                    {
                        path: 'levels1-1',
                        title: 'Menu Level1-1'
                    }
                ]
            },
            {
                path: 'levels2',
                title: 'Menu Level2'
            }
        ]
    }, 
];
