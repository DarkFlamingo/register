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
    Position
  } = models;

  Code.hasOne(Blank);

  Blank.belongsTo(Code);
  Blank.hasOne(Log);
  Blank.belongsTo(User);
  Blank.hasOne(Extract);

  Authorities.hasOne(Passport);

  Passport.belongsTo(Authorities);
  Passport.hasOne(User);

  User.belongsTo(Passport);
  User.hasOne(Organisation);
  User.hasOne(Position);
  User.hasMany(Log);
  User.hasMany(Blank);
  User.hasMany(Extract);

  Organisation.belongsTo(User);

  Position.belongsTo(User);

  OldValue.belongsTo(Log);

  Log.hasOne(OldValue);
  Log.belongsTo(User);
  Log.belongsTo(Blank);

  Extract.belongsTo(Blank);
  Extract.belongsTo(User);
};
