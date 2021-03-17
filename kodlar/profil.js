  const { Canvas } = require('canvas-constructor');

const { get } = require('node-superfetch'); 
module.exports = {
config: { 
    name: "profil",
  aliases: [],
  help: {
    description: "Profilinize göz atarsınız.",
    usage: "",
    category: "Ekonomi",
  },
  serverOnly: false,
  ownerOnly: false,
  permissions: {
    bot: [],
    user: []
  }
},
run: async function({ message, Discord, db, args, lineUp, settings }) { /*global client*/
  /*
  const Canvas = require('canvas')
const request = require('node-superfetch');
  let kullanici = message.mentions.users.first() || message.author
  var canvas = Canvas.createCanvas(301, 301)
  var ctx = canvas.getContext('2d');
  const avatarURL = kullanici.avatarURL({format: "png"})
  const { body } = await request.get(avatarURL);
  const body2 = await request.get('https://cdn.glitch.com/aed9a9aa-1015-432d-87eb-cb3eca1e7898%2F1.300.jpg?v=1579474957301')
  const bg = await Canvas.loadImage(body)
  const avatar = await Canvas.loadImage(body);
  let isim;
  if(kullanici.username.length > 12) {
    isim = kullanici.username.substring(0,10)+"..."
  }else {
    isim = kullanici.username
  }

  Canvas.loadImage('https://i.hizliresim.com/PGEGVb.png').then(async resim => {
    Canvas.loadImage('https://cdn.discordapp.com/emojis/583079214840807465.png?v=1').then(async resi => {
      Canvas.loadImage('https://cdn.discordapp.com/attachments/673200167909851177/686260295622066215/flexed-biceps_1f4aa.png').then(async resi2 => {
      ctx.drawImage(resim, 0, 0, 300, 300);
      ctx.fillStyle = "rgb(79, 79, 79)";
      ctx.fill()
      ctx.fillRect(30,60,85, 86)
      ctx.fillStyle = "rgb(114,137,217)"
      ctx.fill()
      ctx.fillRect(7,94,284,191)
      ctx.strokeStyle = "rgb(79, 79, 79)";
      ctx.lineWidth = "2"
      ctx.strokeRect(110,95,181,47);
      ctx.font = `25px Lato`;
      var grd = ctx.createLinearGradient(0.000, 66.000, 300.000, 234.000);  
      grd.addColorStop(0.190, 'rgba(0, 0, 0, 1.000)');
      grd.addColorStop(0.762, 'rgba(124, 121, 121, 1.000)');
      ctx.fillStyle = grd;
      ctx.fillText(isim, 125, 127);
      ctx.fillStyle = "rgb(63, 81, 145)"
      ctx.fill()
      ctx.fillRect(32,142,80,30)
      ctx.font = `15px Lato`;
      ctx.fillStyle = "rgb(255,255,255)"
      ctx.drawImage(avatar, 33, 62, 79, 80);
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.font = "15px Lato";
      ctx.fillText("",40,200)
      ctx.font = "10px; Lato"

      ctx.moveTo(21,250);
      ctx.lineTo(273,249);
      ctx.lineCap='round';
      ctx.stroke()
      ctx.drawImage(resi,25,230,20,21)
      ctx.fillStyle = "rgb(255,255,255)"
      ctx.font = '13px Lato'
      ctx.fillText(`${await db.fetch(`para_${kullanici.id}`) || 0} ₺`,50,242)
      ctx.fillStyle=  "rgba()"
      ctx.font = "10px Lato"
      ctx.fillText(`${await db.fetch(`xp_${kullanici.id}`) || 0} XP`,21,230)
      ctx.drawImage(resi2,21,242,18,19)
      ctx.moveTo(21,290);
      ctx.lineTo(273,289);
      ctx.lineCap='round';
      ctx.stroke()
      message.channel.send({files:[{attachment:canvas.toBuffer(),name:""+ message.author.tag+".png"}]})
    })
  })
})*/


  

  
let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  if (!user) user = message.author;
  if (user.bot) return message.channel.send(`**${message.author.username}**, Botların profili olamaz.`);
  


    let background = 'https://cdn.discordapp.com/attachments/492914262482878485/499770634172104715/Dreamy_Underwater_Bubbles_Sun_Light_iPhone_6_HD_Wallpaper-320x480.jpg' 


    try {    
  async function createCanvas() {

    var namam = user.username;
    var jadim = namam.length > 10 ? namam.substring(0, 12) + "..." : namam;
var msg = message;
    var {body: avatar} = await get(user.displayAvatarURL({size: 128, format:"png"}));
    var {body: background1} = await get(background)
    var {body: background2} = await get('https://cdn.discordapp.com/attachments/492914262482878485/493210917488558111/1537660968355.png');

 // let difference = xp/nxtLvlXp *345;
    
 let zindan = (await db.fetch(`zindan_${user.id}`)) || 0;
    let iş = (await db.fetch(`iş_${user.id}`)) || "Yok";
     let Level = (await db.fetch(`seviye_${user.id + msg.guild.id}`)) || 0;

  let nxtLvlXp = Level * 300;
    
 


   let para = (await db.fetch(`para_${user.id}`)) || 0;
    let xp = (await db.fetch(`puancik_${user.id + msg.guild.id}`)) || 0;
    var rep_puan = (await db.fetch(`reppuan_${user.id}`)) || 0

       var salam = db.fetch(`xpsira_${user.id + msg.guild.id}`);

  var lvl = db.fetch(`seviye_${user.id + msg.guild.id}`);  
  
        let sira = ''
        const sorted = msg.guild.members.cache.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`xpsira_${b.user.id + msg.guild.id}`) - db.fetch(`xpsira_${a.user.id + msg.guild.id}`) });
        const top10 = sorted.splice(0, msg.guild.memberCount)
        const mappedID = top10.map(s => s.user.id);
        for(var i = 0; i < msg.guild.memberCount; i++) {
                if(mappedID[i] === user.id) {
                        sira += `${i + 1}`
                }
        }
  return new Canvas(600, 600)
    .setColor('#000000')
    .addImage(background1, 0,0,600,600)
    .addBeveledImage(background2, 0,0,600,600)
    //.addImage("dIcon", 190,250,55,55)
    .addImage("FiSh", 530,370,40,40)
    .addImage("W ICON", 530,480,30,30)
    .setTextFont('30px NotoEmoji, RobotoRegular') 
    .addText(`${jadim}`, 250, 285)
    .setTextFont('30px Impact') 
    .addText(`+Rep:`, 240,330)
    .addText(rep_puan, 340,330) 
    .setTextFont('30px Impact')
    .addText('|', 280,380)
    .addText('|', 280,400)
    .addText('|', 280,420)
    .addText('|', 280,450)
    .addText('|', 280,470)
    .addText('|', 280,495)
    .addText('_______', 495,420) 
    .addText('_______', 495,460) 
    .addText('_________', 495,520) 
    .addText('_______', 495,560) 
    .addText('_______________________', 150,500)
    .setTextFont('bold 28px Courier New')
   // .addImage(cIcon, 300,355,40,40)
    .addText('Son işlemler', 290,385)
    .setTextFont('17px NotoEmoji')
    .addText(`Satın alınmadı`, 295, 413)
    .setTextFont('bold 30px Courier New')
    .addText('Level', 172,390)
    .setTextFont('17px RobotoRegular') 
    .addText('Toplam XP', 180, 530)
    .addText('Toplam Para', 180, 560)
    .addText(xp, 370, 530)
    .addText(`${para}₺`, 370, 560)
    .setTextAlign('center')
    .setTextFont('bold 20px Courier New')
    .addText(`Zindan:${zindan}`,543,455)
    .addText(`Sıra:${sira}`, 543,555) 
    .setTextFont('bold 40px Courier New')
    .addText(Level, 220,450)
    .setColor("#459466")
    .addRect(150, 570, "difference", 34)
    .setTextFont("16px RobotoRegular")
    .setColor("#000000")
    .setTextAlign("center")
    .addText(`XP: ${xp} / 300`, 330, 590)
    .addRoundImage(avatar, 10, 190, 168, 168, 168/2)
    .toBufferAsync();
  }
  
  let m = await message.channel.send('*Lütfen bekleyin...*')
 .then(x => x.delete({ timeout: 1 }))
  const gumen = `
**${user.tag} Adlı kullanıcının profili;**
`; message.channel.send(gumen, new Discord.MessageAttachment(await createCanvas(), 'profil.png'))
//ne ara yazdın aq
  } catch (e) {
    message.channel.send(`Oh çok büyük bir hata çıktı: \`${e.stack}\` :( lütfen daha sonra tekrar deneyiniz.`);
  } 
  
  
  
}
}