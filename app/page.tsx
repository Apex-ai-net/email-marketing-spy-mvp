'use client'

import { useState } from 'react'
import { Mail, Search, TrendingUp, Clock, Target, AlertCircle, CheckCircle, Calendar, BarChart3, Download } from 'lucide-react'

interface EmailCampaign {
  id: string
  subject: string
  date: string
  type: 'promotional' | 'newsletter' | 'abandoned-cart' | 'welcome' | 'product-launch'
  urgencyScore: number
  performanceScore: number
}

interface CompetitorAnalysis {
  brand: string
  overallScore: number
  totalCampaigns: number
  avgFrequency: number
  bestSendTime: string
  topPerformingSubject: string
  campaigns: EmailCampaign[]
  insights: {
    working: string[]
    opportunities: string[]
  }
  stats: {
    emojiUsage: number
    avgSubjectLength: number
    urgencyFrequency: number
    bestDay: string
  }
}

const mockAnalysis: CompetitorAnalysis = {
  brand: 'Nike',
  overallScore: 94,
  totalCampaigns: 47,
  avgFrequency: 3.2,
  bestSendTime: 'Tuesday 2:00 PM',
  topPerformingSubject: 'Your cart misses you + 20% off',
  campaigns: [
    {
      id: '1',
      subject: 'FINAL HOURS: 50% Off Everything 🔥',
      date: '2024-11-29 14:00',
      type: 'promotional',
      urgencyScore: 95,
      performanceScore: 92
    },
    {
      id: '2', 
      subject: 'New Air Max Just Dropped 🔥',
      date: '2024-11-27 10:00',
      type: 'product-launch',
      urgencyScore: 65,
      performanceScore: 88
    },
    {
      id: '3',
      subject: 'Missed our sale? Here\'s 20% off',
      date: '2024-11-25 18:00',
      type: 'promotional',
      urgencyScore: 80,
      performanceScore: 85
    },
    {
      id: '4',
      subject: 'Welcome to Nike Family! 👟',
      date: '2024-11-23 09:00',
      type: 'welcome',
      urgencyScore: 20,
      performanceScore: 82
    }
  ],
  insights: {
    working: [
      'Emoji usage in 73% of subject lines drives 23% higher open rates',
      'Countdown timers in promotional emails increase urgency',
      '"Last chance" messaging achieves highest click-through rates',
      'Tuesday 2 PM sends consistently outperform other times'
    ],
    opportunities: [
      'No welcome email series detected (21% revenue opportunity)',
      'Missing seasonal campaigns for Halloween and Valentine\'s Day',
      'Could test longer subject lines (currently averaging 6 words)',
      'No SMS integration detected for multi-channel approach'
    ]
  },
  stats: {
    emojiUsage: 73,
    avgSubjectLength: 6,
    urgencyFrequency: 45,
    bestDay: 'Tuesday'
  }
}

const getTypeColor = (type: string) => {
  const colors = {
    'promotional': 'bg-red-100 text-red-800',
    'newsletter': 'bg-blue-100 text-blue-800', 
    'abandoned-cart': 'bg-orange-100 text-orange-800',
    'welcome': 'bg-green-100 text-green-800',
    'product-launch': 'bg-purple-100 text-purple-800'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600'
  if (score >= 70) return 'text-yellow-600' 
  return 'text-red-600'
}

export default function EmailSpyDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [analysis, setAnalysis] = useState<CompetitorAnalysis | null>(null)

  const handleAnalyze = async () => {
    if (!searchQuery.trim()) return
    
    setIsAnalyzing(true)
    setShowResults(false)
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setAnalysis({
      ...mockAnalysis,
      brand: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)
    })
    setIsAnalyzing(false)
    setShowResults(true)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Email Marketing Spy</h1>
                <p className="text-sm text-gray-500">by CommerceInk</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Competitive Email Intelligence</p>
              <p className="text-xs text-purple-600 font-medium">Live Beta</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <div className="text-center">
            {/* Hero Section */}
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                See Every Email Your Competitors Send
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Discover winning email campaigns, subject lines, and strategies. 
                Get competitive intelligence that drives revenue.
              </p>
              
              {/* Search Box */}
              <div className="flex max-w-md mx-auto mb-8">
                <input
                  type="text"
                  placeholder="Enter competitor brand (e.g., Nike, Adidas)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                />
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !searchQuery.trim()}
                  className="px-6 py-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      <span>Analyze</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Mail className="h-10 w-10 text-purple-600 mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">Campaign Discovery</h3>
                <p className="text-sm text-gray-600">Capture all competitor email campaigns automatically</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <TrendingUp className="h-10 w-10 text-green-600 mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">Performance Analysis</h3>
                <p className="text-sm text-gray-600">Score campaigns and identify top performers</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Clock className="h-10 w-10 text-blue-600 mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">Timing Intelligence</h3>
                <p className="text-sm text-gray-600">Discover optimal send times and frequency</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Target className="h-10 w-10 text-red-600 mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">Strategy Insights</h3>
                <p className="text-sm text-gray-600">Actionable recommendations to outperform</p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Trusted by E-commerce Leaders</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                <div className="text-center font-semibold text-gray-500">SHOPIFY</div>
                <div className="text-center font-semibold text-gray-500">AMAZON</div>
                <div className="text-center font-semibold text-gray-500">ETSY</div>
                <div className="text-center font-semibold text-gray-500">BIGCOMMERCE</div>
              </div>
            </div>
          </div>
        ) : analysis && (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {analysis.brand.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{analysis.brand} Email Intelligence</h2>
                    <p className="text-gray-600">{analysis.totalCampaigns} campaigns analyzed (Last 90 days)</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">{analysis.overallScore}/100</div>
                  <div className="text-sm text-gray-500">Overall Score</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{analysis.avgFrequency}</div>
                  <div className="text-sm text-gray-500">Emails/Week</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{analysis.bestSendTime}</div>
                  <div className="text-sm text-gray-500">Best Send Time</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{analysis.stats.emojiUsage}%</div>
                  <div className="text-sm text-gray-500">Use Emojis</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">{analysis.stats.bestDay}</div>
                  <div className="text-sm text-gray-500">Best Day</div>
                </div>
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Campaigns</h3>
                <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                  <Download className="h-4 w-4" />
                  <span>Export All</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {analysis.campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(campaign.type)}`}>
                          {campaign.type.replace('-', ' ')}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(campaign.date).toLocaleDateString()} at {new Date(campaign.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getScoreColor(campaign.performanceScore)}`}>
                            Performance: {campaign.performanceScore}/100
                          </div>
                          <div className={`text-xs ${getScoreColor(campaign.urgencyScore)}`}>
                            Urgency: {campaign.urgencyScore}/100
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{campaign.subject}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* What's Working */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-800">What's Working</h3>
                </div>
                <div className="space-y-3">
                  {analysis.insights.working.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opportunities */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <h3 className="text-lg font-semibold text-amber-800">Opportunities</h3>
                </div>
                <div className="space-y-3">
                  {analysis.insights.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">{opportunity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-lg text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Outperform Your Competitors?</h3>
              <p className="text-lg mb-6 opacity-90">
                Get comprehensive email marketing strategy sessions with CommerceInk experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                  Schedule Strategy Call
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600">
                  Get Full Report
                </button>
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setShowResults(false)
                  setSearchQuery('')
                  setAnalysis(null)
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                ← Analyze Another Competitor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}