//blockchain_client/

// index.html
// Generate Wallet
$(function() {
    $('#generate_wallet').click(function() {

        $.ajax({
            url: '/wallet/new',
            type: 'GET',
            success: function(response) {
                document.getElementById("public_key").innerHTML = response['public_key'];
                document.getElementById("private_key").innerHTML = response['private_key'];
                document.getElementById("warning").style.display = "block";
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});

// make_transactions.html
$(function() {
    $("#generate_transaction").click(function() {
        $.ajax({
            url: "/generate/transaction",
            type: "POST",
            dataType: 'json',
            data: $('#transaction_form').serialize(),
            success: function(response) {
                document.getElementById('confirmation_sender_public_key').value = response['transaction']['sender_public_key'];
                document.getElementById('confirmation_recipient_public_key').value = response['transaction']['recipient_public_key'];
                document.getElementById('confirmation_amount').value = response['transaction']['amount'];
                document.getElementById('transaction_signature').value = response['signature'];

                $('#basic_modal').modal('show');
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    $('#button_confirm_transaction').click(function() {
        $.ajax({
            url: document.getElementById('node_url').value + '/transactions/new',
            type: 'POST',
            dataType: 'json',
            header: {'Access-Control-Allow-Origin': '*'},
            data: $('#confirmation_transaction_form').serialize(),
            success: function(response) {
                /*$('#sender_public_key').val('');
                $('#sender_private_key').val('');
                $('#recipient_public_key').val('');
                $('#amount').val('');*/

                $('#basic_modal').modal('hide');
                $('#success_transaction_modal').modal('show');

            },
                error: function(error) {
                console.log(error);
            }

        });
    });

});

//view_transactions.html
$(function() {

    $('#view_transactions').click(function(){

        $.ajax({
        url: document.getElementById("node_url").value + "/chain",
        type: 'GET',
        success: function(response){

            console.log(response);
            //Generate Transactions Table
            var transactions = [];
            count = 1;

            for (i = 1; i < response.length; i++) {
            for (j = 0; j < response["chain"][i]["transactions"].length; j++) {

                //format date
                var options = {  year: "numeric", month: "short",  day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"  };
                var date = new Date(response["chain"][i]["timestamp"] * 1000);
                var formattedDateTime = date.toLocaleTimeString("en-GB", options);

                transaction = [count,
                            response["chain"][i]["transactions"][j]["recipient_public_key"],
                            response["chain"][i]["transactions"][j]["sender_public_key"],
                            response["chain"][i]["transactions"][j]["amount"],
                            formattedDateTime,
                            response["chain"][i]["block_number"]];
                transactions.push(transaction);

                count += 1;
            };
            };

            // Restrict a column to 10 characters, do split words
            $('#transactions_table').dataTable( {
                data: transactions,
                columns: [{ title: "#" },
                        { title: "Recipient Public Key"},
                        { title: "Sender Public Key"},
                        { title: "Amount"},
                        { title: "Timestamp"},
                        { title: "Block"}],
                columnDefs: [ {targets: [1,2,3,4,5], render: $.fn.dataTable.render.ellipsis( 25 )}]
            } );

        },
        error: function(error){
            console.log(error);
        }
        });
    });

});

