var items = [
   { id: 1, name: 'Leagues of Legend', price: '123000', date: '2009-01-02', img: "/images/LOL.jpg", type: 1, chitiet: "Hiện chưa có thông tin chi tiết cho tựa game này" },
   { id: 2, name: 'CS:GO', price: '124000', date: '2009-01-03', img: "/images/csgo.jpg", type: 2, chitiet: "Hiện chưa có thông tin chi tiết cho tựa game này" },
   { id: 3, name: 'DOTA 2', price: '125000', date: '2009-01-04', img: "/images/dota2.jpg", type: 1, chitiet: "Hiện chưa có thông tin chi tiết cho tựa game này" },
   { id: 4, name: 'VALORANT', price: '126000', date: '2009-01-05', img: "/images/valorant.jpg", type: 2, chitiet: "Hiện chưa có thông tin chi tiết cho tựa game này" },
   { id: 5, name: 'GENSHIN IMPACT', price: '127000', date: '2009-01-06', img: "/images/genshin.jpg", type: 3, chitiet: "Hiện chưa có thông tin chi tiết cho tựa game này" },

]

const itemModel= require('../models/itemModel')
// select * from items
exports.get = async function getAllitem() {
   return await itemModel.find()
}

// select * from items where id=?
exports.getOne = async function getOneitem(id) {
   return itemModel.findById(id)
}
// delete
exports.delete = async(id) => {
   await itemModel.remove({_id:id})
};
exports.update = (st) => {
   items = items.map(item => item.id == st.id ? {
      ...item, name: st.name, price: st.price, date: st.date, type: st.type, img: st.img ? st.img : item.img, chitiet: st.chitiet
   } : item)
}
exports.insert = async (st) => {
   const item = new itemModel(st)
   await item.save()
}