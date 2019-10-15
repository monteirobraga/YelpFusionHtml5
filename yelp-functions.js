var yelpToken = 'Bearer npfds8pXlaIqu6Gyag8YjyFoQCTrVma71azGIBdo-VFebaPWvKuo33SevmOmqkrt9ACCRA8upBbV8KsXdNGqDACXwt7qK_2iO5IdtkE_TRh3Pz03CBW47OpH6uGkXXYx';
var yelpSearchUrl = 'https://api.yelp.com/v3/businesses/search';

function getReview(businessIdParam, trTable) {
    var reviewPart = '';
    var reviewUrl = 'https://api.yelp.com/v3/businesses/'+businessIdParam+'/reviews';
    var requestObjReviews = {
        'url': reviewUrl,
        headers: {'Authorization': yelpToken},
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Code Challenge Ice Cream @Alpharetta - AJAX error, jqXHR = ', jqXHR, ', textStatus = ', textStatus, ', errorThrown = ', errorThrown)
        }
    }

    $.ajax(requestObjReviews)
    .done(function(theReviewResponse) {
        var revResp = JSON.stringify(theReviewResponse, null, 4);
        var yelpReviewJson = JSON.parse(revResp);
        if (yelpReviewJson.reviews.length > 0) {
            // Complement the table result
            trTable.insertCell(2).innerHTML = yelpReviewJson.reviews[0].user.name;
            trTable.insertCell(3).innerHTML = yelpReviewJson.reviews[0].text;
        } else {
            trTable.insertCell(2).innerHTML = '-';
            trTable.insertCell(3).innerHTML = '-';
        }
        document.getElementById('tbSearchResult').appendChild(trTable);
    });
}

function doSearch() {
    var yelpSearchJson = null;
    if (document.getElementById('tbSearchResult').hasChildNodes) {
        document.getElementById('tbSearchResult').innerHTML = '';
    }
    var requestObjSearch = {
        'url': yelpSearchUrl,
        'data': {term: 'ice cream', location: 'Alpharetta, GA'},
        headers: {'Authorization': yelpToken},
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Code Challenge Ice Cream @Alpharetta - AJAX error, jqXHR = ', jqXHR, ', textStatus = ', textStatus, ', errorThrown = ', errorThrown)
        }
    }    

    $.ajax(requestObjSearch)
        .done(function(theSearchResponse) {
        console.log('________________________________________________________________________________');
        console.log('BEGIN-OF YELP FUSION SEARCHING FOR ALPHARETTA TOP ICE CREAMS');
        this.yelpSearchJson = JSON.parse(JSON.stringify(theSearchResponse, null, 4));
 
        for(let i = 0, l = this.yelpSearchJson.businesses.length; i <=4; i++) {
            var objSearchBusiness = this.yelpSearchJson.businesses[i];
            // Fill the main table result
            var newRow = document.createElement('tr');
            newRow.insertCell(0).innerHTML = objSearchBusiness.name;
            newRow.insertCell(1).innerHTML = objSearchBusiness.location.display_address;
            // Log in the console the row result
            var tmpPartialText = 
            'THE NUMBER '+(i+1)+' --- '+
            'Business Name: '+objSearchBusiness.name
            +' // Address: '+objSearchBusiness.location.display_address;
            console.log(tmpPartialText);

            getReview(objSearchBusiness.id, newRow);
        }
        console.log('END-OF YELP FUSION SEARCHING FOR ALPHARETTA TOP ICE CREAMS');
        console.log('________________________________________________________________________________');
    });
    
}
