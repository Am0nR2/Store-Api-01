const express = require("express")
const mongoose = require("mongoose")
const Product = require("../models/product")
const getProducts = async (req,res) => {
    const queryOBJ = {}
        const {
            name,
            company, 
            featured,
            sort,
            search,
            numericFilter
        } = req.query
    if(name){
        queryOBJ.name = { $regex: name, $options: 'i' }
    }if(company){
        queryOBJ.company = company
    }if(featured){
        queryOBJ.featured = featured === "true" ? true : false 
    }if(numericFilter){
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte"
          };
    
          const replacedString = numericFilter.replace(/(<|<=|=|>=|>)/g, match => `-${operatorMap[match]}-`);
          const options = ["price", "rating"]
          replacedString.split(",").forEach(item => {
            const [field, operator, value] = item.split("-")
            if(options.includes(field)){
                queryOBJ[field] = {[operator]: Number(value)}
            }

          })
       

          
    }

    let result = Product.find(queryOBJ)

    if(sort){
        const sortedList = sort.split(",").join(" ")
        result = result.sort(sortedList)
    } else{
        result = result.sort("createdAt")
    }
    if(search){
        const searchList = search.split(",").join(" ")
        result = result.select(searchList)
    }
    // const currentPage = Number(page) || 1
    // const currentLimit = Number(limit) || 10
    // const pageNum = (currentPage-1) *currentLimit

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    result = result.skip(skip).limit(limit);

    // if(limit || page){
    //     console.log(currentLimit)
    //     console.log(pageNum)
    //     result = result.skip(pageNum).limit(currentLimit)
    // }
    const product = await result
    res.status(200).json({product, nbHits: product.length})
}

module.exports = {getProducts}