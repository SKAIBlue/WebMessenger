/**
 * Created by Anonymous on 2016. 5. 20..
 * 몽고 데이터베이스 컬렉션과 구독을 관리합니다
 */

UserAddition = new Mongo.Collection('UserAddition');

Uploads = new Mongo.Collection("upload_files");

Items = new Mongo.Collection('items');
Uploads.allow({
   insert(userId, doc)
   {
       return true;
   },
   update(userId, doc,fields, modifier)
   {
       return true;
   }
});