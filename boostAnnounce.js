module.exports = {
  name: "guildMemberUpdate",
  async execute(oldMember, newMember, client) {
    const {
      EmbedBuilder,
      ActionRowBuilder,
      ButtonBuilder,
      ButtonStyle,
    } = require("discord.js");

    // All Definitions

    const BoostAnnounceChannel = client.channels.cache.get("CHANNEL_ID");

    const BoostAnnouceLogChannel = client.channels.cache.get("LOG_CHANNEL_ID");

    const format = {
      0: "No Level",
      1: "Level 1",
      2: "Level 2",
      3: "Level 3",
    };

    const BoostLevel = format[newMember.guild.premiumTier];

    const TotalBoosterRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()

        .setLabel("Total Boosters")
        .setEmoji("988797857907769374")
        .setCustomId("Total Boosters")
        .setStyle(ButtonStyle.Primary)
    );

    // Trigger when member Boost the server and received the Nitro Boost Role

    if (!oldMember.roles.cache.size !== newMember.roles.cache.size) {
      if (
        !oldMember.roles.cache.has(newMember.guild.roles.premiumSubscriberRole.id) &&
        newMember.roles.cache.has(newMember.guild.roles.premiumSubscriberRole.id)
      ) {
        const BoostAnnounceEmbed = new EmbedBuilder()
          .setAuthor({
            name: `🎉🎉 BOOSTER PARTY 🎉🎉`,
            iconURL: newMember.guild.iconURL({ dynamic: true }),
          })
          .setDescription(
            `> <@${newMember.user.id}>, You Are Awsome And Amazing.\n\n> Thanks For Boost The Server\n> Enjoy Your ${newMember.guild.roles.premiumSubscriberRole} and Other Exclusive Perks!`
          )
          .addFields({
            name: "> 💎 Total Boost:",
            value: `${newMember.guild.premiumSubscriptionCount} Boost | ${BoostLevel}`,
            inline: false,
          })
          .setImage(
            "https://cdn.discordapp.com/attachments/1022413862634524712/1078707514369130496/p1_3187142_731753fb.jpg"
          )
          .setColor("F47FFF")
          .setFooter({
            text: `${newMember.guild.name} Boost Detection System`,
            iconURL: newMember.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp();
        const BoostAnnounceRow = new ActionRowBuilder().addComponents(
          new ButtonBuilder()

            .setLabel("Total Boosters")
            .setEmoji("988797857907769374")
            .setCustomId("Total Boosters")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setLabel(`${newMember.user.tag}`)
            .setEmoji("899583101796253706")
            .setCustomId("BoostDetection")
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true)
        );

        const msg = await BoostAnnounceChannel.send({
          content: `${newMember} \`<@${newMember.user.id}>\``,
          embeds: [BoostAnnounceEmbed],
          components: [BoostAnnounceRow],
        });
        msg.react("🎉");

        //Send DM to NEW Nitro Booster
        newMember.send({
          content: `Hello ${newMember.user.tag} You are Awesome, Thanks For Boost The **__${newMember.guild.name}__** Server\nSo Enjoy Your **${newMember.guild.roles.premiumSubscriberRole.name}** Role And Other Massive Perks🎉`,
          components: [BoostAnnounceRow],
        });

        //Boost Announce Log System
        const BoostLogEmbed = new EmbedBuilder()
          .setAuthor({
            name: `NEW Boost Detection System`,
            iconURL: client.user.displayAvatarURL(),
          })
          .addFields(
            {
              name: "💎 Nitro Booster",
              value: `${newMember.user} | ${newMember.user.tag}`,
            },
            {
              name: "🎉 Server Boost at:",
              value: `<t:${Math.round(
                newMember.premiumSinceTimestamp / 1000
              )}:f> | <t:${Math.round(
                newMember.premiumSinceTimestamp / 1000
              )}:R>`,
              inline: true,
            },
            {
              name: "⏰ Account Created at:",
              value: `<t:${Math.round(
                newMember.user.createdTimestamp / 1000
              )}:f> | <t:${Math.round(
                newMember.user.createdTimestamp / 1000
              )}:R>`,
              inline: true,
            },
            {
              name: "📆 Joined Server at:",
              value: `<t:${Math.round(
                newMember.joinedTimestamp / 1000
              )}:f> | <t:${Math.round(newMember.joinedTimestamp / 1000)}:R>`,
              inline: true,
            },
            {
              name: "💜 Total Boost",
              value: `${newMember.guild.premiumSubscriptionCount} Boost | ${BoostLevel}`,
              inline: false,
            },
            {
              name: "✅ Assigned Role:",
              value: `${newMember.guild.roles.premiumSubscriberRole} | ${newMember.guild.roles.premiumSubscriberRole.name} | ${newMember.guild.roles.premiumSubscriberRole.id}`,
              inline: false,
            }
          )
          .setThumbnail(
            `${newMember.user.displayAvatarURL({
              size: 2048,
              dynamic: true,
              format: "png",
            })}`
          )
          .setColor(newMember.guild.members.me.displayHexColor)
          .setFooter({
            text: `ID: ${newMember.user.id} (All Action Were Passed)`,
            iconURL: newMember.guild.iconURL({ dynamic: true }),
          })
          .setTimestamp();
        const BoostLog = await BoostAnnounceChannel.send({
          embeds: [BoostLogEmbed],
          components: [TotalBoosterRow],
        });

        //Pin the Embed Message that send in Log channel
        BoostLog.pin();
      }
    }
    //Trigger when Member Unboost the server and remove the Nitro Booster Role
    if (
      oldMember.roles.cache.has(oldMember.guild.roles.premiumSubscriberRole.id) &&
      !newMember.roles.cache.has(oldMember.guild.roles.premiumSubscriberRole.id)
    ) {
      const UnboostEmbedLog = new EmbedBuilder()
        .setAuthor({
          name: `NEW UnBoost or Expired Detection System`,
          iconURL: client.user.displayAvatarURL(),
        })

        .addFields(
          {
            name: "📌 UnBooster:",
            value: `${oldMember.user} | ${oldMember.user.tag}`,
          },
          {
            name: "⏰ Account Created at:",
            value: `<t:${Math.round(
              oldMember.user.createdTimestamp / 1000
            )}:f> | <t:${Math.round(
              oldMember.user.createdTimestamp / 1000
            )}:R>`,
            inline: true,
          },
          {
            name: "📆 Joined Server at:",
            value: `<t:${Math.round(
              oldMember.joinedTimestamp / 1000
            )}:f> | <t:${Math.round(oldMember.joinedTimestamp / 1000)}:R>`,
            inline: true,
          },

          {
            name: "💜 Total Boost:",
            value: `${oldMember.guild.premiumSubscriptionCount} Boost | ${BoostLevel}`,
            inline: false,
          },

          {
            name: "❌ Removed Role:",
            value: `${oldMember.guild.roles.premiumSubscriberRole} | ${oldMember.guild.roles.premiumSubscriberRole.name} | ${oldMember.guild.roles.premiumSubscriberRole.id}`,
            inline: false,
          }
        )
        .setThumbnail(
          `${oldMember.user.displayAvatarURL({
            size: 2048,
            dynamic: true,
            format: "png",
          })}`
        )
        .setColor(oldMember.guild.members.me.displayHexColor)
        .setFooter({
          text: `ID: ${oldMember.user.id}`,
          iconURL: `${oldMember.guild.iconURL({
            size: 2048,
            dynamic: true,
            format: "png",
          })}`,
        })
        .setTimestamp();
      const Unboost = await BoostAnnouceLogChannel.send({
        embeds: [UnboostEmbedLog],
        components: [TotalBoosterRow],
      });

      Unboost.pin();

      //Send DM to NEW UnBooster
      oldMember.send({
        content: `> **Message Form Boost Detection System**\n\n> Hello ${oldMember.user.tag}, Unfortunately Your Nitro Boost For **__${oldMember.guild.name}__** Server Has Been Expired And You Lose Your Special And Cool Perks And Exclusive **${oldMember.guild.roles.premiumSubscriberRole.name}** Role :'(\n\n> 🎉By Boosting Again You Can Get This Perks Back!`,
        components: [TotalBoosterRow],
      });
    }
    //If you Follow and Star to my Repository you can remove this field!
    console.log(
      `Github: https://github.com/zrSadek, Don't Forget to ⭐\nWebsite: https://zrsadek.netlify.app//`
    );
  },
};
