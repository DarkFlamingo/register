export default models => {
  // eslint-disable-next-line
  const {
    User,
    Authorities,
    Blank,
    Code,
    Extract,
    Log,
    OldValue,
    Organisation,
    Passport,
    Position,
    User
  } = models;

  Code.belongsTo(Blank);

  Blank.hasOne(Code);
  Blank.belongsTo(Log);
  Blank.hasOne(User);
  Blank.belongsTo(Extract);

  Authorities.belongsTo(Passport);

  Passport.hasOne(Authorities);
  Passport.belongsTo(User);

  User.hasOne(Passport);
  User.hasOne(Organisation);
  User.hasOne(Position);
  User.belongsTo(Log);
  User.belongsTo(Blank);
  User.belongsTo(Extract);

  Organisation.belongsTo(User);

  Position.belongsTo(User);

  OldValue.belongsTo(Log);

  Log.hasOne(OldValue);
  Log.hasOne(User);
  Log.hasOne(Blank);

  Extract.hasOne(Blank);
  Extract.hasOne(User);
};
