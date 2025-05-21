"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { addItem } from "@/lib/slices/basketSlice"

type Category = {
  id: string
  name: string
}

type FoodItem = {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
}

export default function MenuTable() {
  const [categories, setCategories] = useState<Category[]>([])
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [defaultCategory, setDefaultCategory] = useState<string>("")
  const [addingItemId, setAddingItemId] = useState<string | null>(null)

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, foodRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/foodItems"),
        ])

        const categoryJson = await catRes.json();
        const foodItemData = await foodRes.json()

         setCategories(categoryJson.data);
        setFoodItems(foodItemData.data)

        if (categoryJson.data.length > 0) {
        setDefaultCategory(categoryJson.data[0].id);
      }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const getFoodItemsByCategory = (categoryId: string) => {
    return foodItems.filter((item) => item.categoryId === categoryId)
  }

  if (!defaultCategory) return <div className="text-4xl">Loading...</div>

  return (
    <Tabs defaultValue={defaultCategory} className="w-full">
      <TabsList className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getFoodItemsByCategory(category.id).map((item) => {
              const isAdding = addingItemId === item.id

              const handleAddToCart = () => {
                setAddingItemId(item.id)
                dispatch(
                  addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                  })
                )
                setTimeout(() => setAddingItemId(null), 500) // Simulate delay/reset
              }

              return (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <p className="text-lg font-bold">USD {item.price.toFixed(2)}</p>
                    <Button
                      disabled={isAdding}
                      onClick={handleAddToCart}
                      className="text-lg font-bold"
                    >
                      {isAdding ? "Adding..." : "Add to Cart"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
