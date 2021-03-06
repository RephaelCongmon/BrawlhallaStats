function showStats(result) {
    console.log("Ran using showStats()!");
    if ((result.error) && (result.error.code == 404) ){
            document.querySelector('#playerNotFound').style.display = "inline";
            document.querySelector('#hiddenSearchBar').style.display = "flex";
            document.querySelector('#playerLoading').style.display = "none";
           
    }
    else {
        document.querySelector('#searchResults').style.display = "none";
        document.querySelector('#playerNotFound').style.display = "none";
        document.querySelector('#playerSearchBar').style.display = "none";
        document.querySelector('#playerLoading').style.display = "none";
        

        var playerName = result.name;
        var playerGames = result.games;
        var playerWins = result.wins;
        var playerLosses = result.games-result.wins;
        var playerLevel = result.level;
        var playerXPPercentage = result.xp_percentage;
        var playerCurrentElo = result.playerRanked.rating;
        var playerPeakElo = result.playerRanked.peak_rating;
        var playerTier = result.playerRanked.tier;

        playerXPPercentage *= 100;
        playerXPPercentage = Math.floor(playerXPPercentage);
        var playerXPPercentageString = playerXPPercentage + "%";
        console.log(playerXPPercentageString);
        console.log("Amount of legends = ", result.legends.length);

        var playerXP = result.xp;
        var playerClan;
        var playerClanXP;
        var playerClanContribution;
        if (result.clan){
            playerClan = result.clan.clan_name;
            playerClanXP = result.clan.clan_xp;
            playerClanContribution = result.clan.personal_xp;
        }
        
        var playerBombKOs = result.kobomb;
        var playerMineKOs = result.komine;
        var playerSpikeballKOs = result.kospikeball;
        var playerSidekickKOs = result.kosidekick;
        var playerSnowballKOs = result.kosnowball;
        var playerLookups = result.lookups;

        var timeSpentInGame = 0;
        var damageDealt = 0;
        var damageTaken = 0;
        var playerKOs = 0;
        var playerFalls = 0;
        var playerSuicides = 0;
        var playerDamageUnarmed = 0;
        var playerDamageThrownItem = 0;
        var playerDamageGadgets = 0;

        var playerKOsUnarmed = 0;
        var playerKOsThrownItem = 0;
        var playerKOsGadgets = 0;
    
        var legendLevel;
    
        var legendName;
        var legendKills;
        var legendFalls;
        var legendGames;
        var legendWins;
        var legendLosses;
        var legendWinRatio;
        var legendKillRatio;
        var legendTime;
        var str = "";
        var mostPlayedLegend = "";
        var mostPlayedLegendCurr = 0;
        str += `<table id="leaderboard-table" class="table table-striped table-bordered dt-responsive dataTable no-footer dtr-inline display nowrap" role="grid" aria-describedby="leaderboard-table-info" width="100%" border-collapse="collapse" class="display nowrap">
        <tbody>`;

        for (var i = 0; i < result.legends.length; i++){
            if ((i+1) % 2 == 1){
                str += '<tr role="row" class="odd">';
            }
            else {
                str += '<tr role="row" class="even">';
            }

            str += `<td class="sorting_1" tabindex="0" data-order="${result.legends[i].legend_name_key}"><b>${result.legends[i].legend_name_key.toUpperCase()}</b></td>`;
            str += `<td data-order="${result.legends[i].level}"><b>${result.legends[i].level}</b></td>`;
            str += result.legends[i].games ? `<td data-order="${(result.legends[i].wins/result.legends[i].games)*100}">${((result.legends[i].wins/result.legends[i].games)*100).toFixed(2).toString() + '%'}</td data-order="0">` : `<td>0.00%</td>`;
            str += result.legends[i].games ? `<td data-order="${(result.legends[i].games/playerGames)*100}">${((result.legends[i].games/playerGames)*100).toFixed(2).toString() + '%'}</td data-order="0">` : `<td>0.00%</td>`;
            str += `<td data-order="${result.legends[i].damagedealt}">${numberWithCommas(result.legends[i].damagedealt)}</td>`;
            str += `<td data-order="${result.legends[i].kos}">${numberWithCommas(result.legends[i].kos)}</td>`;
            str += `<td data-order="${result.legends[i].falls}">${numberWithCommas(result.legends[i].falls)}</td>`;
            str += `<td data-order="${result.legends[i].suicides}">${numberWithCommas(result.legends[i].suicides)}</td>`;
            str += `<td data-order="${result.legends[i].wins}">${numberWithCommas(result.legends[i].wins)}</td>`;
            str += `<td data-order="${result.legends[i].games - result.legends[i].wins}">${numberWithCommas(result.legends[i].games - result.legends[i].wins)}</td>`;
            str += `<td data-order="${result.legends[i].games}">${numberWithCommas(result.legends[i].games)}</td>`;
            str += result.legends[i].matchtime ? `<td data-order="${result.legends[i].matchtime}">${timeStringFunction(result.legends[i].matchtime)}</td>` : `<td data-order="0">Never Played</td>`;
            
            str += '</tr>';

            if ( (result.legends[i].games/playerGames) > mostPlayedLegendCurr ){
                mostPlayedLegendCurr = result.legends[i].games/playerGames;
                mostPlayedLegend = result.legends[i].legend_name_key;
            }

            damageDealt += parseInt(result.legends[i].damagedealt);
            damageTaken += parseInt(result.legends[i].damagetaken);
            timeSpentInGame += parseInt(result.legends[i].matchtime);
            playerKOs += parseInt(result.legends[i].kos);
            playerFalls += parseInt(result.legends[i].falls);
            playerSuicides += parseInt(result.legends[i].suicides);
            playerDamageUnarmed += parseInt(result.legends[i].damageunarmed);
            playerDamageThrownItem += parseInt(result.legends[i].damagethrownitem);
            playerDamageGadgets += parseInt(result.legends[i].damagegadgets);
            playerKOsUnarmed += parseInt(result.legends[i].kounarmed);
            playerKOsThrownItem += parseInt(result.legends[i].kothrownitem);
            playerKOsGadgets += parseInt(result.legends[i].kogadgets);

            legendLevel = result.legends[i].level;
            legendName = result.legends[i].legend_name_key;
            legendKills = result.legends[i].kos;
            legendFalls = result.legends[i].falls;
            legendGames = result.legends[i].games;
            legendWins = result.legends[i].wins;
            
            legendLosses = legendGames - legendWins;
            legendWinRatio = legendWins/legendLosses;
            legendKillRatio = legendKills/legendFalls;

            legendTime = result.legends[i].matchtime;

            //document.getElementById("legendName" + `${i}`).innerHTML = `${legendName} (Lvl. ${legendLevel})`;
            //document.querySelector("#legend" + `${i}`).style.display = "block";
            //document.getElementById("legendStatsId" + `${i}`).innerHTML = `<ul class="list-unstyled"><li><b>Level:</b> ${legendLevel}</li><br />` + 
        
                // `<li><b>Games Played:</b> ${numberWithCommas(legendGames)}</li>` +
                // `<li><b>Wins:</b> ${numberWithCommas(legendWins)}</li>` +
                // `<li><b>Losses:</b> ${numberWithCommas(legendLosses)}</li>` +
                // `<li><b>W/L Ratio: </b> ${legendWinRatio.toFixed(2)}</li><br />` +
                
                // `<li><b>Kills:</b> ${numberWithCommas(legendKills)}</li>` +
                // `<li><b>Deaths:</b> ${numberWithCommas(legendFalls)}</li>` +
                // `<li><b>K/D Ratio:</b> ${legendKillRatio.toFixed(2)}</li><br />` +
                // `<li><b>Time In-game:</b> ${timeStringFunction(legendTime)}</li></ul>`;
                
            
        }

        str += '</tbody>';
            str += `<thead>
                    <tr role="row">
                        <th class="sorting_asc" tabindex="0" aria-controls="leaderboard-table" rowspan="1" colspan="1" aria-label="#: activate to sort column descending" style="width: 130px;" aria-sort="ascending">Legend Name
                        </th>

                        <th class="sorting" tabindex="0" aria-controls = "leaderboard-table" rowspan="1" colspan="1" aria-label="Player: activate to sort column ascending" style="width: 10px;">Level</th>

                        <th class="sorting" tabindex="0" aria-controls = "leaderboard-table" rowspan="1" colspan="1" aria-label="Kills: activate to sort column ascending" style="width: 70px;">Win Rate</th>

                        <th class="sorting" tabindex="0" aria-controls = "leaderboard-table" rowspan="1" colspan="1" aria-label="Kills: activate to sort column ascending" style="width: 70px;">Play Rate</th>

                        <th class="sorting" tabindex="0" aria-controls = "leaderboard-table" rowspan="1" colspan="1" aria-label="Deaths: activate to sort column ascending" style="width: 132px;">Damage Dealt</th>

                        <th class="sorting" tabindex="0" aria-controls = "leaderboard-table" rowspan="1" colspan="1" aria-label="Wins: activate to sort column ascending" style="width: 100px;">Kills</th>

                        <th class="sorting" tabindex="0" aria-controls = "leaderboard-table" rowspan="1" colspan="1" aria-label="Wins: activate to sort column ascending" style="width: 100px;">Deaths</th>

                        <th class="sorting" tabindex="0" aria-controls = "leaderboard-table" rowspan="1" colspan="1" aria-label="Wins: activate to sort column ascending" style="width: 100px;">Suicides</th>

                        <th class="sorting" tabindex="0" aria-controls = "leaderboard-table" rowspan="1" colspan="1" aria-label="Wins Solo: activate to sort column ascending" style="width: 70px;">Wins</th>

                        <th class="sorting" tabindex="0" aria-controls = "leaderboard-table" rowspan="1" colspan="1" aria-label="Wins Solo: activate to sort column ascending" style="width: 70px;">Losses</th>

                        <th class="sorting" tabindex="0" aria-controls = "leaderboard-table" rowspan="1" colspan="1" aria-label="Wins Solo: activate to sort column ascending" style="width: 70px;">Games Played</th>

                        <th class="sorting" tabindex="0" aria-controls = "leaderboard-table" rowspan="1" colspan="1" aria-label="Wins Team: activate to sort column ascending" style="width: 350px;">Time Played</th>

                    
                    </tr>
                </thead>
            </table>`;

            document.querySelector('#leaderboardClass').innerHTML = '' + str;


        var timeSpentInGameString = timeStringFunction(timeSpentInGame);

        document.querySelector('#hiddenSearchBar').style.display = "flex";
        document.querySelector('#playerStats').style.display = "inline";
        document.getElementById('playerName').innerHTML = `${playerName}`;
        console.log("mostPlayedLegend =", mostPlayedLegend);
        //document.getElementById("playerPic").src = `https://brawlhallastats.herokuapp.com/assets/images/${mostPlayedLegend}.png`;
        document.getElementById('playerLevel').innerHTML = `<b>Level: </b>${playerLevel}<br />`;

        

        jQuery(document).ready(function ($) {
            $.noConflict();
            setTimeout(function(){$("#xp-bar-fill").css("-webkit-transition","all 0.01s ease");
            $("#xp-bar-fill").css("width",`0%`);},10);
        
            $("#xp-increase-fx").css("display","inline-block");
            $("#xp-bar-fill").css("box-shadow",/*"0px 0px 15px #06f,*/ "-5px 0px 10px #fff inset");


            setTimeout(function(){$("#xp-bar-fill").css("-webkit-transition","all 2s ease");
            $("#xp-bar-fill").css("width",`${playerXPPercentageString}`);},100);

            console.log("This ran");

            setTimeout(function(){$("#xp-increase-fx").fadeOut(500);$("#xp-bar-fill").css({"-webkit-transition":"all 0.5s ease","box-shadow":""});},2000);
            setTimeout(function(){$("#xp-bar-fill").css({"width":`${playerXPPercentageString}`});},3000);
        });
        //doit(`${playerXPPercentageString}`);

        document.getElementById('playerXP').innerHTML = `<br /><b>Total XP:</b> ${numberWithCommas(playerXP)}<br /><br />`;
        document.getElementById('playerGames').innerHTML = `<b>Games Played:</b> ${numberWithCommas(playerGames)}<br />`;
        document.getElementById('playerWins').innerHTML = `<b>Games Won:</b> ${numberWithCommas(playerWins)}<br />`;
        document.getElementById('playerLosses').innerHTML = `<b>Games Lost:</b> ${numberWithCommas(playerLosses)}<br />`;
        document.getElementById('playerWinRate').innerHTML = `<b>Win Rate:</b> ${ ((playerWins/playerGames)*100).toFixed(2).toString() + '%'}<hr>`;

        document.getElementById('playerDamageDealt').innerHTML = `<b>Total Damage Dealt:</b> ${numberWithCommas(damageDealt)}<br />`;
        document.getElementById('playerDamageTaken').innerHTML = `<b>Total Damage Taken:</b> ${numberWithCommas(damageTaken)}<br />`;
        document.getElementById('playerDamageUnarmed').innerHTML = `<b>Damage Using Unarmed:</b> ${numberWithCommas(playerDamageUnarmed)}<br />`;
        document.getElementById('playerDamageThrownItem').innerHTML = `<b>Damage With Thrown Items:</b> ${numberWithCommas(playerDamageThrownItem)}<br />`;
        document.getElementById('playerDamageGadgets').innerHTML = `<b>Damage Using Gadgets:</b> ${numberWithCommas(playerDamageGadgets)}<hr>`;

        document.getElementById('playerKDRatio').innerHTML = `<b>K/D Ratio:</b> ${ (playerKOs/playerFalls).toFixed(2)}<br /><br />`;
        document.getElementById('playerKOs').innerHTML = `<b>Total KOs:</b> ${numberWithCommas(playerKOs)}<br />`;
        document.getElementById('playerFalls').innerHTML = `<b>Total Falls:</b> ${numberWithCommas(playerFalls)}<br />`;
        document.getElementById('playerSuicides').innerHTML = `<b>Total Suicides:</b> ${numberWithCommas(playerSuicides)}<br />`;
        document.getElementById('playerKOsUnarmed').innerHTML = `<b>KOs Using Unarmed:</b> ${numberWithCommas(playerKOsUnarmed)}<br />`;
        document.getElementById('playerKOsThrownItem').innerHTML = `<b>KOs Throwing Items:</b> ${numberWithCommas(playerKOsThrownItem)}<br />`;
        document.getElementById('playerKOsGadgets').innerHTML = `<b>KOs Using Gadgets:</b> ${numberWithCommas(playerKOsGadgets)}<br /><br />`
        document.getElementById('playerSuicideRate').innerHTML = `One suicide every <b>${ (playerGames/playerSuicides).toFixed(2)} games</b><hr>`;

        document.getElementById('playerTimeInGame').innerHTML = `<b>Time Spent In-game:</b> ${timeSpentInGameString}<br /><br />`;

        document.getElementById('playerLookups').innerHTML = `<b>Searched:</b> ${numberWithCommas(playerLookups)} Times<br />`;
        
        if (result.clan){
            document.getElementById('playerClan').innerHTML = `<b>${playerClan}</b><br /><br />`;
            document.getElementById('playerClanXP').innerHTML = `<b>Clan XP: </b>${numberWithCommas(playerClanXP)}<br />`;
            document.getElementById('playerClanIndividual').innerHTML = `<b>Individual Contribution: </b>${numberWithCommas(playerClanContribution)} xp<br />`;
            document.getElementById('clanButton').innerHTML = `<button onclick="window.location.href = 'https://www.brawlhallastats.com/clan/?clan=${result.clan.clan_id}';"  class="btn btn-default btn-custom waves-effect m-b-5 leaderboard-button-player.cops_and_crims" >Click to View Clan</button>`;
        }
        else {
            document.getElementById('playerClan').innerHTML = `<b>Not In A Clan!</b><br />`;
            document.getElementById('playerClanXP').innerHTML = `<b></b>`;
        }

        document.getElementById('playerBombKOs').innerHTML = `<b>Bomb Kills: </b>${numberWithCommas(playerBombKOs)}<br />`;
        document.getElementById('playerMineKOs').innerHTML = `<b>Mine Kills: </b>${numberWithCommas(playerMineKOs)}<br />`;
        document.getElementById('playerSpikeballKOs').innerHTML = `<b>Spikeball Kills: </b>${numberWithCommas(playerSpikeballKOs)}<br />`;
        document.getElementById('playerSidekickKOs').innerHTML = `<b>Sidekick Kills: </b>${numberWithCommas(playerSidekickKOs)}<br />`;
        document.getElementById('playerSnowballKOs').innerHTML = `<b>Snowball Kills: </b>${numberWithCommas(playerSnowballKOs)}<br />`;

        document.getElementById('playerRankedStatsInfo').innerHTML = result.playerRanked.games ? (`<hr>`
        + `<div style="display:inline-block;vertical-align:top;">`
        + `<img src="https://brawlhallastats.herokuapp.com/assets/images/${playerTier}.png" ALIGN=”left” HSPACE=”50” VSPACE=”50”/>`
        + `</div>`
        + `<div style="display:inline-block;">`
        + `<b>Current Tier: </b>${result.playerRanked.tier}<br />`
        + `<b>Current Elo: </b>${playerCurrentElo}<br />`
        + `<b>Peak Elo: </b>${playerPeakElo}<br />`
        + `<b>Region: </b>${result.playerRanked.region}<br />`
        + (result.playerRanked.games ? `<b>Total 1v1 Matches: </b>${numberWithCommas(result.playerRanked.games)}<br />`: `<b>Total 1v1 Matches: </b>0`)
        + `<b>Ranked 1v1 Wins: </b>${numberWithCommas(result.playerRanked.wins)}<br />`
        + `<b>Ranked 1v1 W/L Ratio: </b>${((result.playerRanked.wins/result.playerRanked.games)*100).toFixed(2).toString()}%<br />`
        + `<b>Glory Earned This Season: </b>${numberWithCommas(getGlory(result.playerRanked.wins, result.playerRanked.peak_rating))} glory.<br />`
        + `</div>`):`Player has not played enough ranked matches this season for ranked data!`;

        jQuery(document).ready(function ($) {
            $.noConflict();
            $('#leaderboard-table').DataTable( {
                colReorder: true,
                "bSortCellsTop": true,
                scrollX: true,
                responsive: false
            //});
            }).columns.adjust();
               
            });

        
    }
}

function showPlayerStatsWithFunctions(id) {
    
    document.querySelector('#playerSearchBar').style.display = "none";
    document.querySelector('#playerNotFound').style.display = "none";
    document.querySelector('#playerStats').style.display = "none";
    document.querySelector('#playerSearchInfo').style.display = "none";
    document.querySelector('#playerLoading').style.display = "inline";
    document.querySelector('#playerErrorOccurred').style.display = "none";
    document.querySelector('#BrawlhallaStatsAd').style.display = "none";

    jQuery(document).ready(function ($) {
        $.noConflict();
        setTimeout(function(){$("#xp-bar-fill").css("-webkit-transition","all 0.01s ease");
        $("#xp-bar-fill").css("width",`0%`);},10);
    });

    // for (var x = 0; x < 48; x++){
    //     document.querySelector("#legend" + `${x}`).style.display = "none";  
    // }

    //fetch('https://brawlhallastats.herokuapp.com/api/player-stats?playerID=' +  getUrlParameter('playerID') )
    fetch('https://brawlhallastats.herokuapp.com/api/submit-form3-by-id?' + id.toString() ) //new URLSearchParams(window.location.search).toString() )
    .then(response => response.json())
    .then(result => { 
        console.log("Results in submit-form3-by-id = ", result);
        showStats(result);
    })

    .catch(err => {
        console.log("Error = ", err);

    
    });

    //return playerXPPercentageString;
    return;
}

function getGlory(wins, elo){
    var glory = 0;
    var winsGlory = 0;
    var eloGlory = 0;
    var temp = 0;

    if (elo < 1200){
        eloGlory = 250;
    }
    else if (elo >= 1200 && elo <= 1285){
        eloGlory = 10*(25 + (75*(elo-1200)/86) );
    }
    else if (elo >= 1286 && elo <= 1389){
        eloGlory = 10*(100 + (75*(elo-1286)/104) );
    }
    else if (elo >= 1390 && elo <= 1679){
        eloGlory = 10*(187 + (113*(elo-1390)/290) );
    }
    else if (elo >= 1680 && elo <= 1999){
        eloGlory = 10*(300 + (137*(elo-1680)/320) );
    }
    else if (elo >= 2000 && elo <= 2299){
        eloGlory = 10*(437 + (43*(elo-2000)/300) );
    }
    else {
        eloGlory = (elo-2300)/20;
        eloGlory = eloGlory + 480;
        eloGlory = eloGlory * 10;
      
    }

    if (wins <= 150){
        winsGlory = 20*wins;
        
    }
    else {
        temp = Math.log10(2*wins);
        temp = Math.pow(temp, 2);
        temp = 450* temp;
        temp = 245 + temp;
        winsGlory = temp;
       
    }

    glory += winsGlory;
    glory += eloGlory;
    glory = Math.floor(glory);
    console.log("winsGlory = ", winsGlory);
    console.log("eloGlory = ", eloGlory);
    return glory;

}

