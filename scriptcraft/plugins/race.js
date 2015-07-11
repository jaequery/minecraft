var blocks = require('blocks');
var sounds = require('sounds');
var slash = require('slash');
var utils = require('utils');

/*global require, events */

function triggerOnDiamond(event){
  var player = event.player;
  var id = player.ID;
  var location = player.location;

  // need to convert coordinates to integers
  var x = Math.floor(location.x);
  var y = Math.floor(location.y - 1 ); // what's underfoot?
  var z = Math.floor(location.z);
  var block = location.world.getBlockAt(x, y, z);

  // if stepped on, start the game!
  if (block.typeId === blocks.diamond){
    start_game();
    return;
  }
}

function triggerOnRedstone(event){
  var player = event.player;
  var id = player.ID;
  var location = player.location;

  // need to convert coordinates to integers
  var x = Math.floor(location.x);
  var y = Math.floor(location.y - 1 ); // what's underfoot?
  var z = Math.floor(location.z);
  var block = location.world.getBlockAt(x, y, z);

  // if stepped on, start the game!
  if (block.typeId === blocks.redstone){
    finish_game(player);
    return;
  }
}

function start_game(){
  var players = utils.players();

  for (i=0; i < players.length; i++ ) {
    player = players[i];
    sounds.slimeAttack(player);
    slash([
      'time set day',
      'weather clear',
      'tp ' + player.name + ' -20 70 251',
    ], server);

    echo(player, 'game starting in 3 ');

    setTimeout(function(){
      echo(player, '2');
    }, 2000);

    setTimeout(function(){
      echo(player, '1');
    }, 3000);

    setTimeout(function(){
      echo(player, 'GOOOOOO!!!');
    }, 4000);
  }
}

function finish_game(winner){
  var players = utils.players();

  for (i=0; i < players.length; i++ ) {
    echo(player, winner.name + ' is the winner! ');
    player = players[i];
    sounds.zombieDeath(player);
    sounds.zombieDeath(player);
    sounds.zombieDeath(player);
    echo(player, 'congratulation! ');
    slash([
      'tp ' + player.name + ' -26 71 241',
    ], server);
    setTimeout(function(){
      slash([
        'tp ' + player.name + ' -26 70 248',
      ], server);
    }, 3000);
  }
}

events.playerMove( triggerOnDiamond );
events.playerMove( triggerOnRedstone );

command('race', function (parameters, sender) {
  start_game();
});
