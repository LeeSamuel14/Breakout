var _0x48da=['text_Medium','HIGH\x20SCORE:\x200','HIGH\x20SCORE:\x20','highScore','GameState','height','setTo','button_Easy','Hard','isLoss','orange-tile','difficulty','Easy','logo','stateObject','green-tile','currentLevel','getItem','button_Hard','#000','button','initGameText','state','text_HighScore','HARD','start','add','anchor','#33CCFF','text','events','game','initButtons','text_Easy','onInputDown','brickHitScore','EASY','scale','text_Hard','MEDIUM','bold','button_Medium','sprite','width','spritesheet_breakout','red-tile','initStateObject','brickDieScore','center'];(function(_0x26ff49,_0x12e838){var _0x48daff=function(_0x5c969a){while(--_0x5c969a){_0x26ff49['push'](_0x26ff49['shift']());}};_0x48daff(++_0x12e838);}(_0x48da,0xd1));var _0x5c96=function(_0x26ff49,_0x12e838){_0x26ff49=_0x26ff49-0x185;var _0x48daff=_0x48da[_0x26ff49];return _0x48daff;};var Breakout=Breakout||{};Breakout['HomeState']={'init':function(){},'create':function(){var _0x421767=_0x5c96;this[_0x421767(0x1a6)](),this['initLogo'](),this[_0x421767(0x198)](),this[_0x421767(0x18d)](),this['initHighScore']();},'initStateObject':function(){var _0xc6d4b0=_0x5c96;this['stateObject']={},this[_0xc6d4b0(0x186)][_0xc6d4b0(0x188)]=0x1,this[_0xc6d4b0(0x186)]['gameScore']=0x0,this['stateObject'][_0xc6d4b0(0x1ac)]=0x0,this[_0xc6d4b0(0x186)][_0xc6d4b0(0x1b2)]=![],this[_0xc6d4b0(0x186)]['difficulty']=_0xc6d4b0(0x1b5),this[_0xc6d4b0(0x186)]['brickHitScore']=0xa,this[_0xc6d4b0(0x186)][_0xc6d4b0(0x1a7)]=0x64,localStorage[_0xc6d4b0(0x189)](_0xc6d4b0(0x1ac))?this[_0xc6d4b0(0x186)]['highScore']=parseInt(localStorage[_0xc6d4b0(0x189)]('highScore')):localStorage['setItem']('highScore',this[_0xc6d4b0(0x186)]['highScore']);},'initLogo':function(){var _0x5158c6=_0x5c96;this['logo']=this['game'][_0x5158c6(0x192)][_0x5158c6(0x1a2)](this[_0x5158c6(0x197)]['width']/0x2,0x50,_0x5158c6(0x185)),this[_0x5158c6(0x185)][_0x5158c6(0x193)][_0x5158c6(0x1af)](0.5),this[_0x5158c6(0x185)][_0x5158c6(0x19d)][_0x5158c6(0x1af)](0x2);},'initButtons':function(){var _0x22ccc8=_0x5c96;this['button_Easy']=this[_0x22ccc8(0x197)][_0x22ccc8(0x192)]['button'](this['game'][_0x22ccc8(0x1a3)]/0x2,this['game']['height']/0x4+0x3c,_0x22ccc8(0x1a4),null,null,_0x22ccc8(0x187),_0x22ccc8(0x187),_0x22ccc8(0x187),'green-tile'),this[_0x22ccc8(0x1b0)]['anchor']['setTo'](0.5),this[_0x22ccc8(0x1b0)][_0x22ccc8(0x196)][_0x22ccc8(0x19a)][_0x22ccc8(0x192)](function(){var _0x48d5f0=_0x22ccc8;this['stateObject']['difficulty']='Easy',this[_0x48d5f0(0x186)]['brickHitScore']=0xa,this['stateObject'][_0x48d5f0(0x1a7)]=0x64,this[_0x48d5f0(0x18e)]['start'](_0x48d5f0(0x1ad),!![],![],this['stateObject']);},this),this[_0x22ccc8(0x1a1)]=this[_0x22ccc8(0x197)][_0x22ccc8(0x192)][_0x22ccc8(0x18c)](this['game'][_0x22ccc8(0x1a3)]/0x2,this['game'][_0x22ccc8(0x1ae)]/0x2+0x3c,_0x22ccc8(0x1a4),null,null,_0x22ccc8(0x1b3),_0x22ccc8(0x1b3),'orange-tile',_0x22ccc8(0x1b3)),this[_0x22ccc8(0x1a1)][_0x22ccc8(0x193)][_0x22ccc8(0x1af)](0.5),this[_0x22ccc8(0x1a1)][_0x22ccc8(0x196)][_0x22ccc8(0x19a)][_0x22ccc8(0x192)](function(){var _0x347f8f=_0x22ccc8;this[_0x347f8f(0x186)][_0x347f8f(0x1b4)]='Medium',this[_0x347f8f(0x186)][_0x347f8f(0x19b)]=0xc,this[_0x347f8f(0x186)][_0x347f8f(0x1a7)]=0x7d,this[_0x347f8f(0x18e)][_0x347f8f(0x191)](_0x347f8f(0x1ad),!![],![],this['stateObject']);},this),this['button_Hard']=this['game'][_0x22ccc8(0x192)][_0x22ccc8(0x18c)](this[_0x22ccc8(0x197)][_0x22ccc8(0x1a3)]/0x2,this['game'][_0x22ccc8(0x1ae)]-this[_0x22ccc8(0x197)][_0x22ccc8(0x1ae)]/0x4+0x3c,'spritesheet_breakout',null,null,_0x22ccc8(0x1a5),_0x22ccc8(0x1a5),_0x22ccc8(0x1a5),_0x22ccc8(0x1a5)),this[_0x22ccc8(0x18a)][_0x22ccc8(0x193)][_0x22ccc8(0x1af)](0.5),this['button_Hard'][_0x22ccc8(0x196)][_0x22ccc8(0x19a)]['add'](function(){var _0x15ff6e=_0x22ccc8;this['stateObject'][_0x15ff6e(0x1b4)]=_0x15ff6e(0x1b1),this['stateObject']['brickHitScore']=0xf,this[_0x15ff6e(0x186)]['brickDieScore']=0x96,this[_0x15ff6e(0x18e)][_0x15ff6e(0x191)](_0x15ff6e(0x1ad),!![],![],this[_0x15ff6e(0x186)]);},this);},'initGameText':function(){var _0x24414f=_0x5c96,_0x500593={'font':'32px\x20Press\x20Start\x202P','fontStyle':_0x24414f(0x1a0),'fill':_0x24414f(0x18b),'align':'center'},_0x1e4c20={'font':'26px\x20Press\x20Start\x202P','fontStyle':_0x24414f(0x1a0),'fill':_0x24414f(0x194),'align':_0x24414f(0x1a8)};this[_0x24414f(0x199)]=this[_0x24414f(0x197)][_0x24414f(0x192)][_0x24414f(0x195)](this[_0x24414f(0x197)]['width']/0x2,this[_0x24414f(0x197)][_0x24414f(0x1ae)]/0x4+0x3c,_0x24414f(0x19c),_0x500593),this[_0x24414f(0x1a9)]=this['game'][_0x24414f(0x192)][_0x24414f(0x195)](this[_0x24414f(0x197)][_0x24414f(0x1a3)]/0x2,this[_0x24414f(0x197)][_0x24414f(0x1ae)]/0x2+0x3c,_0x24414f(0x19f),_0x500593),this[_0x24414f(0x19e)]=this[_0x24414f(0x197)]['add'][_0x24414f(0x195)](this['game'][_0x24414f(0x1a3)]/0x2,this['game']['height']-this[_0x24414f(0x197)]['height']/0x4+0x3c,_0x24414f(0x190),_0x500593),this[_0x24414f(0x18f)]=this[_0x24414f(0x197)][_0x24414f(0x192)][_0x24414f(0x195)](this[_0x24414f(0x197)][_0x24414f(0x1a3)]/0x2,this[_0x24414f(0x197)]['height']-0x14,'HIGH\x20SCORE:\x20',_0x1e4c20),this['text_Easy'][_0x24414f(0x193)][_0x24414f(0x1af)](0.5),this[_0x24414f(0x1a9)][_0x24414f(0x193)][_0x24414f(0x1af)](0.5),this[_0x24414f(0x19e)]['anchor'][_0x24414f(0x1af)](0.5),this[_0x24414f(0x18f)][_0x24414f(0x193)][_0x24414f(0x1af)](0.5);},'initHighScore':function(){var _0x42df34=_0x5c96;if(localStorage[_0x42df34(0x189)](_0x42df34(0x1ac))){var _0x421d6c=localStorage['getItem'](_0x42df34(0x1ac));this[_0x42df34(0x18f)][_0x42df34(0x195)]=_0x42df34(0x1ab)+_0x421d6c;}else this[_0x42df34(0x18f)][_0x42df34(0x195)]=_0x42df34(0x1aa);}};