var rply ={type : 'text'}; //type是必需的,但可以更改

var PlayerData = require('./PlayerData.js');
var BattleStates = require('./BattleStates.js');
var WeaponBox = require('./WeaponBox.js');
var BadgeBox = require('./BadgeBox.js');
var MateBox = require('./MateBox.js');
var SkillBox = require('./SkillBox.js');
var ItemBox = require('./ItemBox.js');
var AccessoryBox = require('./AccessoryBox.js');
var Guild = require('./Guild.js');
var GuildFacility = require('./GuildFacility.js');

var PD = PlayerData.GetArray();
var BS = BattleStates.GetArray();
var WB = WeaponBox.GetArray();
var BB = BadgeBox.GetArray();
var MB = MateBox.GetArray();
var SB = SkillBox.GetArray();
var IB = ItemBox.GetArray();
var AB = AccessoryBox.GetArray();
var GD = Guild.GetArray();
var GF = GuildFacility.GetArray();
