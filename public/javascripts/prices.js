$(document).ready(function() {
  $('#volume').val("500");
  $('#prices').click(function(event) {
    console.log('Update prices');

    $.getJSON("/prices/bitfinex/xmrbtc", function(data){
      var asks = data.asks;

      $.each(asks, function(i, ask){
        ask.price = parseFloat(ask.price);
        ask.amount = parseFloat(ask.amount);
        //console.log(i + " " + ask.price);
      });

      asks = asks.sort(asc);
      var sum =0;
      var volumeValue = getVolumeValue();
      var deleteFrom = 0;
      $.each(asks, function(i, ask){
        sum += ask.amount;
        ask.sum = sum.toFixed(1);
        ask.sum = parseFloat(ask.sum);
        if(sum < volumeValue) deleteFrom = i;
      });

      //console.log(asks);

      asks = asks.splice(deleteFrom+1);

      $('.tablebuy').bootstrapTable('load', asks);

      showselltable();

      $('.row').show();
    });



  });

  $('#volume').click(function(event) {
    if($(this).val() == "Any")
    $(this).val("");
  });

  $('#volume').focusout(function(){
    //console.log('volume changed');
    if($(this).val().length == 0 || !$.isNumeric($(this).val()) || $(this).val() < 1)
      $(this).val("Any");
  });

  function showselltable(){
    $.getJSON("/prices/poloniex/xmrbtc", function(data){
      var bids = data.bids;

      $.each(bids, function(i, bid){
        bid.price = parseFloat(bid.price);
        bid.amount = parseFloat(bid.amount);
        //console.log(i + " " + bid.price);
      });

      bids = bids.sort(desc);
      var sum =0;
      var deleteFrom=0;
      var volumeValue = getVolumeValue();
      $.each(bids, function(i, bid){
        sum += bid.amount;
        bid.sum = sum.toFixed(1);
        bid.sum = parseFloat(bid.sum);
        if(sum < volumeValue) deleteFrom = i;
      });



      bids = bids.splice(deleteFrom+1);
      //console.log(bids);


      $('.tablesell').bootstrapTable('load', bids);

      var valBuy =   $('.tablebuy').bootstrapTable('getData');
      var valSell =   $('.tablesell').bootstrapTable('getData');
      valBuy = valBuy[0].price;
      valSell = valSell[0].price;
      var difference = parseFloat((valSell - valBuy)).toFixed(6);
      var differenceXMR = volumeValue * parseFloat(difference);
      var verdict = (difference>0)? "<u>PROFIT</u>" : "<u>LOSS</u><br>";
      var txt = verdict;
      txt+="<br>"+Math.abs(difference) + " BTC / XMR";
      txt+="<br><b>"+Math.abs(parseFloat(differenceXMR.toFixed(6))) + "</b> BTC / " + volumeValue + " XMR";

      $('#difference').html(txt);
    });
  }
});

function asc(a,b){
  if(a.price < b.price) return -1;
  return 1;
}
function desc(a,b){
  if(a.price >= b.price) return -1;
  return 1;
}
function getVolumeValue(){
  if($('#volume').val() == "Any")
    return 0;
  return $('#volume').val();
}
