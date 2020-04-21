module.exports = function() {
   return {
      typeDefs: `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`
   };
}
