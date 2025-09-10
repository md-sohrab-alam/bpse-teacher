import { NextRequest, NextResponse } from 'next/server'
import { getAllNews, getLatestNews, getNewsByType, NewsFilters } from '@/lib/news-manager'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const type = searchParams.get('type')
    const priority = searchParams.get('priority')
    const limit = searchParams.get('limit')
    const isActive = searchParams.get('isActive')
    
    // Build filters
    const filters: NewsFilters = {}
    
    if (type) {
      filters.type = type as 'notification' | 'news' | 'update'
    }
    
    if (priority) {
      filters.priority = priority as 'high' | 'medium' | 'low'
    }
    
    if (limit) {
      filters.limit = parseInt(limit)
    }
    
    if (isActive !== null) {
      filters.isActive = isActive === 'true'
    }
    
    // Get news based on filters
    let news
    if (type && !priority && !limit && isActive === null) {
      // If only type is specified, use optimized function
      news = getNewsByType(type as 'notification' | 'news' | 'update')
    } else if (!type && !priority && limit && isActive === 'true') {
      // If only limit is specified and active, use optimized function
      news = getLatestNews(parseInt(limit))
    } else {
      // Use general function with filters
      news = getAllNews(filters)
    }
    
    return NextResponse.json({
      success: true,
      data: news,
      count: news.length,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('News API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch news',
        message: 'Internal server error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // This would be used for admin to add news
    // For now, return method not allowed
    return NextResponse.json(
      { 
        success: false, 
        error: 'Method not allowed',
        message: 'Use GET to fetch news'
      },
      { status: 405 }
    )
  } catch (error) {
    console.error('News API POST error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process request',
        message: 'Internal server error'
      },
      { status: 500 }
    )
  }
}

