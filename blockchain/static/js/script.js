// blockchain/blockchain.py


//index.html
$(function() {

    $.ajax({
        url: "/chain",
        type: "GET",
        success: function(response) {
            let transactions = []
            let count = 1

            for (i=0; i<response['length']; i++) {
                for (j=0; j<response['chain'][i]['transactions'].length; j++) {
                    let options = {  year: "numeric", month: "short",  day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"  };
                    let date = new Date(response["chain"][i]["timestamp"] * 1000);
                    formattedTimestamp = date.toLocaleTimeString('en-GB', options); //// British English (en-GB) uses 24-hour time without AM/PM

                    let transaction = [
                        count,
                        response['chain'][i]['transactions'][j]['sender_public_key'],
                        response['chain'][i]['transactions'][j]['recipient_public_key'],
                        response['chain'][i]['transactions'][j]['amount'],
                        formattedTimestamp,
                        response['chain'][i]['block_number']
                    ]

                    transactions.push(transaction);
                    count += 1;
                }
            }

            $('#transactions_table').dataTable({
                data: transactions,
                columns: [
                    {title: "#"},
                    {title: "Sender Public Key"},
                    {title: "Recipient Public Key"},
                    {title: "Amount"},
                    {title: "Timestamp"},
                    {title: "Block#"},

                ],
                columnDefs: [{targets: [1,2,3,4,5], render: $.fn.dataTable.render.ellipsis(25)}]
            });
        },
        error: function(error) {
            console.log(error);
        }
    });



    $.ajax({
        url: "/transactions/get",
        type: "GET",
        success: function(response) {

            let transactions = []
            let count = 1

            for (i=0; i<response['transactions'].length; i++) {

                let transaction = [
                    count,
                    response['transactions'][i]['sender_public_key'],
                    response['transactions'][i]['recipient_public_key'],
                    response['transactions'][i]['amount'],
                ]

                transactions.push(transaction);

                count += 1;
            }

            $('#unmined_transactions_table').dataTable({
                data: transactions,
                columns: [
                    {title: "#"},
                    {title: "Sender Public Key"},
                    {title: "Recipient Public Key"},
                    {title: "Amount"},
                ],
                columnDefs: [{targets: [1,2,3], render: $.fn.dataTable.render.ellipsis(25)}]
            });
        },
        error: function(error) {
            console.log(error);
        }
    });

    $('#mine_button').click(function() {
        $.ajax({
            url: '/mine',
            type: 'GET',
            success: function(response) {
                window.location.reload();
            },
            error: function(error) {
                console.log(error);
            }

        });
    });

    $('#refresh_transactions').click(function() {
        window.location.reload();
    });

    $('#refresh_blockchain').click(function() {
        $.ajax({
            url: '/nodes/resolve',
            type: 'GET',
            success: function(response) {
                window.location.reload();
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

});


//configure.html
$(function() {
    $('#add_node_button').click(function() {
        $.ajax({
            url: '/nodes/register',
            type: 'POST',
            dataType: 'json',
            data: $('#node_form').serialize(),
            success: function(response) {
                document.getElementById('nodes').value = '';
                window.location.reload();
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    $.ajax({
        url: '/nodes/get',
        type: 'GET',
        success: function(response) {
            let nodes = '';
            for (i=0; i<response['nodes'].length; i++) {
                node = "<li><a href=http://" + response['nodes'][i] + ">" + response['nodes'][i] + "</a></li>"
                document.getElementById('list_nodes').innerHTML += node;
            }
        },
        error: function(error) {
            console.log(error);
        }
    });

});
