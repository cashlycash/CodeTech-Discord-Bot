const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  TextInputBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ModalBuilder,
  TextInputStyle,
  Client,
  Message,
  ComponentType,
  StringSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  name: "reactroles",
  aliases: ["rr"],
  description: "Make a panel with buttons to give and take roles",
  UserPerms: [PermissionFlagsBits.Administrator],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array} args
   */
  run: async (client, message, args) => {
    var panel = {
      name: ``,
      desc: ``,
      buttons: [],
    };

    var startbutton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`startrrs`)
        .setLabel(`Start Panel Creation`)
        .setStyle(ButtonStyle.Primary)
    );
    var startembed = new EmbedBuilder()
      .setTitle(`React Roles Panel`)
      .setDescription(
        `This will present you a graphical interface to create a panel with buttons from where a member can take or withdraw from a role`
      )
      .setColor("Blurple");

    var startrep = await message.reply({
      content: `Button Expires <t:${Math.floor(
        (Date.now() + 15_000) / 1000
      )}:R>`,
      embeds: [startembed],
      components: [startbutton],
    });

    var startint = await message.channel
      .awaitMessageComponent({
        filter: (i) => i.customId == "startrrs",
        componentType: ComponentType.Button,
        time: 15_000,
      })
      .catch(() => {});

    if (!startint) {
      return await startrep.edit({
        content: `Button Timeout`,
        components: [],
        embeds: [],
      });
    }

    var namemodal = new ModalBuilder()
      .setCustomId(`rrs`)
      .setTitle(`React Roles`)
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setStyle(TextInputStyle.Short)
            .setCustomId(`name`)
            .setLabel(`Panel Name`)
            .setPlaceholder(`Name of the React Roles panel`)
        ),

        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setStyle(TextInputStyle.Paragraph)
            .setCustomId(`desc`)
            .setLabel(`Panel Description`)
            .setPlaceholder(`Description of the React Roles panel`)
        )
      );

    startrep.edit({
      content: `Modal Expires <t:${Math.floor(
        (Date.now() + 60_000) / 1000
      )}:R>`,
    });

    await startint.showModal(namemodal);

    nameint = await startint
      .awaitModalSubmit({
        filter: (i) => (i.customId = `rss`),
        time: 60_000,
      })
      .catch(() => {});

    if (!nameint) {
      return await startrep.edit({
        content: `Modal Timeout`,
        components: [],
        embeds: [],
      });
    }

    panel.name = nameint.fields.getField(`name`).value;
    panel.desc = nameint.fields.getField(`desc`).value;

    var roleembed = new EmbedBuilder()
      .setTitle(`Manage Roles`)
      .setDescription(
        `Add or remove roles from the portal using the buttons below. Use the select menu to get more information about a set role`
      )
      .setColor(`Green`);

    var rolebuttons = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(`rss-quickaddrole`)
        .setLabel(`Quick Add Role`)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`rss-addrole`)
        .setLabel(`Add Role`)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`rss-removerole`)
        .setLabel(`Remove Role`)
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId(`rss-submit`)
        .setLabel(`Done`)
        .setStyle(ButtonStyle.Primary)
    );

    var listofroles = (arrayofbuttons) => {
      var selectmenu = new StringSelectMenuBuilder()
        .setPlaceholder(`The list of all the roles`)
        .setCustomId(`rss-list`);

      if (arrayofbuttons.length == 0) {
        selectmenu.setOptions({
          label: `No Roles Added`,
          value: `none`,
          description: `Use the buttons below to add more roles`,
        });
      } else {
        var options = [];
        arrayofbuttons.forEach((buttonbld) => {
          const button = buttonbld.data;
          var roleid = button.custom_id.split(":")[1];
          var rolename = message.guild.roles.cache.get(roleid).name;
          var buttonname = button.label;
          var buttonstyle =
            Object.values(ButtonStyle)[
              Object.keys(ButtonStyle).findIndex((v) => v == button.style)
            ];

          var option = {
            label: buttonname,
            value: roleid,
            description: `Style: "${buttonstyle}" \ Role: "${rolename}"`,
          };
          if (button.emoji) option.emoji = button.emoji;
          options.push(option);
        });
        selectmenu.setOptions(options);
      }

      var actionrow = new ActionRowBuilder().setComponents(selectmenu);
      return actionrow;
    };

    var rolemsg = await nameint.update({
      content: `Role Portal Expires <t:${Math.floor(
        (Date.now() + 20 * 60_000) / 1000
      )}:R>`,
      embeds: [roleembed],
      components: [listofroles(panel.buttons), rolebuttons],
    });

    var rolecol = rolemsg.createMessageComponentCollector({
      time: 20 * 60_000,
    });

    var deletemode = false;
    rolecol.on(`collect`, async (roleint) => {
      if (roleint.isButton()) {
        if (roleint.customId == `rss-submit`) {
          var channelmenu = new ActionRowBuilder().setComponents(
            new ChannelSelectMenuBuilder()
              .setCustomId(`channelmenu`)
              .setPlaceholder(`Select the channel where you want to send`)
          );
          roleint.update({
            components: [channelmenu],
          });
        } else if (roleint.customId == `rss-addrole`) {
          var roledata = {
            label: null,
            role: null,
            style: null,
            emoji: null,
          };
          var buildcomps = (role) => {
            var addemb = new EmbedBuilder()
              .setTitle(`Add a role`)
              .setDescription(
                `Use the buttons below to set the fields of the new option in your panel.`
              )
              .addFields(
                {
                  name: `Button Role`,
                  value: `${
                    role.role
                      ? message.guild.roles.cache.get(role.role).name
                      : `[empty]`
                  }`,
                  inline: true,
                },
                {
                  name: `Button Label`,
                  value: `${role.label || `[empty]`}`,
                  inline: true,
                },
                {
                  name: `Button Style`,
                  value: `${
                    role.style
                      ? Object.values(ButtonStyle)[
                          Object.keys(ButtonStyle).findIndex(
                            (v) => v == role.style
                          )
                        ]
                      : `[empty]`
                  }`,
                  inline: true,
                },
                {
                  name: `Button Emoji ID`,
                  value: `${role.emoji || `[empty]`}`,
                  inline: true,
                }
              )
              .setColor("Aqua");
            var addbtns = new ActionRowBuilder().setComponents(
              new ButtonBuilder()
                .setCustomId(`role`)
                .setLabel((role.role == null ? `Set` : `Edit`) + ` Role`)
                .setStyle(
                  role.role == null
                    ? ButtonStyle.Secondary
                    : ButtonStyle.Success
                ),
              new ButtonBuilder()
                .setCustomId(`label`)
                .setLabel((role.label == null ? `Set` : `Edit`) + ` Label`)
                .setStyle(
                  role.label == null
                    ? ButtonStyle.Secondary
                    : ButtonStyle.Success
                ),
              new ButtonBuilder()
                .setCustomId(`style`)
                .setLabel((role.style == null ? `Set` : `Edit`) + ` Style`)
                .setStyle(
                  role.style == null
                    ? ButtonStyle.Secondary
                    : ButtonStyle.Success
                ),
              new ButtonBuilder()
                .setCustomId(`emoji`)
                .setLabel((role.emoji == null ? `Set` : `Edit`) + ` Emoji`)
                .setStyle(
                  role.emoji == null
                    ? ButtonStyle.Secondary
                    : ButtonStyle.Success
                ),
              new ButtonBuilder()
                .setCustomId(`done`)
                .setLabel(`Submit`)
                .setStyle(ButtonStyle.Primary)
            );
            var prevbut = new ButtonBuilder()
              .setCustomId(`br:${role.role || `[empty]`}`)
              .setLabel(role.label || `[empty]`)
              .setStyle(role.style || ButtonStyle.Secondary)
              .setDisabled(true);
            if (role.emoji) {
              prevbut.setEmoji(role.emoji);
            }
            var addresult = new ActionRowBuilder().setComponents(
              new ButtonBuilder()
                .setCustomId(`..`)
                .setLabel(`Button Preview :`)
                .setStyle(ButtonStyle.Danger)
                .setEmoji("👀")
                .setDisabled(true),
              prevbut
            );
            return [[addemb], [addbtns, addresult]];
          };
          var comps = buildcomps(roledata);
          var addtimestamp = Math.floor((Date.now() + 10 * 60_000) / 1000);

          var addrep = await (
            await roleint.reply({
              content: `Expires <t:${addtimestamp}:R>`,
              embeds: comps[0],
              components: comps[1],
            })
          ).fetch();

          var addcol = addrep.createMessageComponentCollector({
            time: 10 * 60_000,
          });
          addcol.on("collect", async (addint) => {
            var btnid = addint.customId;
            if (addint.isStringSelectMenu() || addint.isRoleSelectMenu()) {
              if (btnid == `stylemenu`) {
                var stylevalue = parseInt(addint.values[0]);
                roledata.style = stylevalue;
                var repcomps = buildcomps(roledata);
                addint.update({
                  content: `Expires <t:${addtimestamp}:R>`,
                  embeds: repcomps[0],
                  components: repcomps[1],
                });
              } else if (btnid == `rolemenu`) {
                var rolevalue = addint.values[0];
                roledata.role = rolevalue;
                var repcomps = buildcomps(roledata);
                addint.update({
                  content: `Expires <t:${addtimestamp}:R>`,
                  embeds: repcomps[0],
                  components: repcomps[1],
                });
              }
            }
            if (btnid == `done`) {
              if (!roledata.label || !roledata.role || !roledata.style) {
                addint.reply({
                  content: `Please make sure you have filled in all the fields`,
                  ephemeral: true,
                });
              }
              var button = new ButtonBuilder()
                .setCustomId(`br:${roledata.role}`)
                .setLabel(roledata.label)
                .setStyle(roledata.style);
              if (roledata.emoji) {
                button.setEmoji(roledata.emoji);
              }
              panel.buttons.push(button);
              addcol.stop();
              rolemsg.edit({
                components: [listofroles(panel.buttons), rolebuttons],
              });
            } else if (btnid == `emoji`) {
              var modal = new ModalBuilder()
                .setTitle(`Set Emoji`)
                .setCustomId(`set-emoji`)
                .setComponents(
                  new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                      .setCustomId(`emoji`)
                      .setLabel(`Enter Emoji ID or Emoji`)
                      .setPlaceholder(
                        `Emoji ID or the emoji (must be in a mutual server)`
                      )
                      .setStyle(TextInputStyle.Short)
                      .setMaxLength(80)
                      .setMinLength(1)
                      .setRequired(true)
                  )
                );
              addint.showModal(modal);
              addrep.edit({
                content: `Modal expires <t:${Math.floor(
                  (Date.now() + 2 * 60_000) / 1000
                )}:R>`,
              });

              var addmodalint = await addint
                .awaitModalSubmit({
                  time: 2 * 60_000,
                })
                .catch(() => {});

              if (!addmodalint) {
                rolemsg.edit({
                  content: `Modal Timeout`,
                  components: [],
                  embeds: [],
                });
                return addcol.stop();
              }

              var modalvalue = addmodalint.fields
                .getField("emoji")
                .value.trim();
              if (modalvalue.length > 2) {
                modalvalue = modalvalue.match(/([0-9]+)/)[0];
              }
              roledata.emoji = modalvalue;
              var repcomps = buildcomps(roledata);
              addmodalint.update({
                content: `Expires <t:${addtimestamp}:R>`,
                embeds: repcomps[0],
                components: repcomps[1],
              });
            } else if (btnid == `role`) {
              var rolemenu = new ActionRowBuilder().setComponents(
                new RoleSelectMenuBuilder()
                  .setCustomId(`rolemenu`)
                  .setPlaceholder(`Select the role of the button`)
              );
              addint.update({
                content: `Select menu expires <t:${Math.floor(
                  (Date.now() + 2 * 60_000) / 1000
                )}:R>`,
                components: [rolemenu],
              });
            } else if (btnid == `style`) {
              var stylemenu = new ActionRowBuilder().setComponents(
                new StringSelectMenuBuilder()
                  .setCustomId(`stylemenu`)
                  .setPlaceholder(`Select the style of the button`)
                  .setOptions([
                    {
                      value: ButtonStyle.Primary.toString(),
                      label: `Primary / Blurple`,
                      description: `Blurple or Blue-ish Purple color`,
                      emoji: `🟣`,
                    },
                    {
                      value: ButtonStyle.Danger.toString(),
                      label: `Danger / Red`,
                      description: `Bright Red color`,
                      emoji: `🔴`,
                    },
                    {
                      value: ButtonStyle.Success.toString(),
                      label: `Success / Green`,
                      description: `Bright Green or Lime color`,
                      emoji: `🟢`,
                    },
                    {
                      value: ButtonStyle.Secondary.toString(),
                      label: `Secondary / Gray`,
                      description: `Light Gray color`,
                      emoji: `⚫`,
                    },
                  ])
              );
              addint.update({
                content: `Select menu expires <t:${Math.floor(
                  (Date.now() + 2 * 60_000) / 1000
                )}:R>`,
                components: [stylemenu],
              });
            } else if (btnid == `label`) {
              var modal = new ModalBuilder()
                .setTitle(`Set label`)
                .setCustomId(`set-label`)
                .setComponents(
                  new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                      .setCustomId(`value`)
                      .setLabel(`Enter value`)
                      .setPlaceholder(`Value for the "label" field`)
                      .setStyle(TextInputStyle.Short)
                      .setMaxLength(80)
                      .setMinLength(1)
                      .setRequired(true)
                  )
                );
              addint.showModal(modal);
              addrep.edit({
                content: `Modal expires <t:${Math.floor(
                  (Date.now() + 2 * 60_000) / 1000
                )}:R>`,
              });

              var addmodalint = await addint
                .awaitModalSubmit({
                  time: 2 * 60_000,
                })
                .catch(() => {});

              if (!addmodalint) {
                rolemsg.edit({
                  content: `Modal Timeout`,
                  components: [],
                  embeds: [],
                });
                return addcol.stop();
              }

              var modalvalue = addmodalint.fields.getField("value").value;
              roledata.label = modalvalue;
              var repcomps = buildcomps(roledata);
              addmodalint.update({
                content: `Expires <t:${addtimestamp}:R>`,
                embeds: repcomps[0],
                components: repcomps[1],
              });
            }
          });
          addcol.on(`end`, (collected, reason) => {
            if (reason == `time` || reason == `idle`) {
              rolemsg.edit({
                components: [],
                embeds: [],
                content: `Add Role Timeout`,
              });
            }
            addrep.delete();
          });
        } else if (roleint.customId == `rss-removerole`) {
          if (deletemode == false) {
            deletemode = true;
            roleint.reply({
              content: `You now **CAN** use the Select Menu to select which button you want to delete`,
              ephemeral: true,
            });
          } else {
            deletemode = false;
            roleint.reply({
              content: `You now **CANNOT** use the Select Menu to select which button you want to delete`,
              ephemeral: true,
            });
          }
        } else if (roleint.customId == `rss-quickaddrole`) {
          var rolemenu = new ActionRowBuilder().setComponents(
            new RoleSelectMenuBuilder()
              .setCustomId(`rolemenu`)
              .setPlaceholder(`Select Your Role`)
          );
          var qari = await (
            await roleint.reply({
              content: `Expires in <t:${Math.floor(
                (Date.now() + 2 * 60_000) / 1000
              )}:R>`,
              components: [rolemenu],
            })
          ).fetch();

          var qarmi = await qari
            .awaitMessageComponent({ time: 2 * 60_000 })
            .catch(() => {});

          if (!qarmi) {
            return qari.delete();
          }

          var roleid = qarmi.values[0];
          var rolename = message.guild.roles.cache.get(roleid).name;
          var roledata = {
            label: rolename,
            role: roleid,
            style: ButtonStyle.Primary,
          };

          var button = new ButtonBuilder()
            .setCustomId(`br:${roledata.role}`)
            .setLabel(roledata.label)
            .setStyle(roledata.style);

          panel.buttons.push(button);

          qari.delete();
          rolemsg.edit({
            components: [listofroles(panel.buttons), rolebuttons],
          });
        }
      } else if (roleint.isStringSelectMenu()) {
        if (deletemode == true) {
          var roleid = roleint.values[0];
          panel.buttons = panel.buttons.filter(
            (b) => b.data.custom_id.split(":")[1] !== roleid
          );
          await roleint.update({
            content: `Role Portal Expires <t:${Math.floor(
              (Date.now() + 20 * 60_000) / 1000
            )}:R>`,
            embeds: [roleembed],
            components: [listofroles(panel.buttons), rolebuttons],
          });
          await roleint.followUp({
            content: `Deleted!`,
            ephemeral: true,
          });
          deletemode = false;
        } else {
          await roleint.update({
            content: `Role Portal Expires <t:${Math.floor(
              (Date.now() + 20 * 60_000) / 1000
            )}:R>`,
            embeds: [roleembed],
            components: [listofroles(panel.buttons), rolebuttons],
          });
        }
      } else if (roleint.isChannelSelectMenu()) {
        var channelid = roleint.values[0];
        var channel = message.guild.channels.cache.get(channelid);
        var panelembed = new EmbedBuilder()
          .setTitle(panel.name)
          .setDescription(panel.desc)
          .setColor("Blurple");
        var instructionembed = new EmbedBuilder().setDescription(
          `Use the buttons to below Add or Remove (toggle) the roles linked to them.`
        );
        var buttons = panel.buttons;
        var rows = [];
        for (let i = 0; i < Math.ceil(buttons.length / 5); i++) {
          rows.push(new ActionRowBuilder());
        }
        rows.forEach((row, i) => {
          row.addComponents(buttons.slice(0 + i * 5, 5 + i * 5));
        });
        rolecol.stop();
        channel.send({
          embeds: [panelembed, instructionembed],
          components: rows,
        });
      }
    });

    rolecol.on(`end`, (collected, reason) => {
      if (reason == `time` || reason == `idle`) {
        return rolemsg.edit({
          content: `Role Portal Timeout`,
          components: [],
          embeds: [],
        });
      }
      message.delete();
      rolemsg.delete();
    });
  },
};
