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
    Organization,
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
  User.belongsTo(Organization);
  User.belongsTo(Position);
  User.hasMany(Log);
  User.hasMany(Blank);
  User.hasMany(Extract);

  Organization.hasOne(User);

  Position.hasOne(User);

  OldValue.belongsTo(Log);

  Log.hasOne(OldValue);
  Log.belongsTo(User);
  Log.belongsTo(Blank);

  Extract.belongsTo(Blank);
  Extract.belongsTo(User);
};
