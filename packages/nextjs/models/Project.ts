import { prop,getModelForClass } from "@typegoose/typegoose";

class Project {
  @prop()
  public name?: string;

  @prop()
  public category?: string;

  @prop()
  public payoutAddress?: string;

  @prop()
  public nominationUrl?: string;

  @prop()
  public  websiteUrl?: string;

  @prop()
  public  twitterLink?: string;

  @prop()
  public githubLink?: string;

  @prop()
  public description?: string;

  @prop()
  public questions1?: string;

  @prop()
  public questions2?: string;

  @prop()
  public questions3?: string;

  @prop()
  public email?: string;

  @prop()
  public discordHandle?: string;
  
  @prop()
  public slug?: string;

  @prop()
  public creatorAddress?:string;
}

export const ProjectModel  = getModelForClass(Project)