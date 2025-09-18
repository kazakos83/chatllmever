
import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    // Check if environment variables are set
    const config = {
      hasApiKey: !!process.env.SENDGRID_API_KEY,
      hasFromEmail: !!process.env.SENDGRID_FROM_EMAIL,
      hasToEmail: !!process.env.SENDGRID_TO_EMAIL,
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'not set',
      toEmail: process.env.SENDGRID_TO_EMAIL || 'not set',
      apiKeyPrefix: process.env.SENDGRID_API_KEY?.substring(0, 10) + '...' || 'not set'
    }

    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json({ 
        error: 'SENDGRID_API_KEY is missing',
        config
      }, { status: 400 })
    }

    if (!process.env.SENDGRID_FROM_EMAIL) {
      return NextResponse.json({ 
        error: 'SENDGRID_FROM_EMAIL is missing',
        config
      }, { status: 400 })
    }

    if (!process.env.SENDGRID_TO_EMAIL) {
      return NextResponse.json({ 
        error: 'SENDGRID_TO_EMAIL is missing',
        config
      }, { status: 400 })
    }

    // Set API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    // Test both admin and client emails
    const testData = {
      name: 'Test User',
      email: process.env.SENDGRID_TO_EMAIL, // Send client email to same address for testing
      phone: '1800-EVERGUARD',
      company: 'Test Company',
      service: 'corporate-intelligence',
      urgency: 'medium',
      message: 'This is a test submission to verify email functionality.',
      budget: '5k-10k',
      inquiryId: 'TEST-' + Date.now()
    }

    // Import the email functions
    const { sendAdminNotification, sendClientAcknowledgment } = await import('@/lib/sendgrid')

    // Test admin notification
    console.log('Testing admin notification...')
    const adminResult = await sendAdminNotification(testData)
    console.log('Admin email result:', adminResult)

    // Test client acknowledgment  
    console.log('Testing client acknowledgment...')
    const clientResult = await sendClientAcknowledgment(testData)
    console.log('Client email result:', clientResult)

    return NextResponse.json({ 
      success: true,
      message: 'Email tests completed',
      config,
      results: {
        adminEmail: {
          success: adminResult.success,
          error: adminResult.error || null
        },
        clientEmail: {
          success: clientResult.success, 
          error: clientResult.error || null
        }
      },
      testData: {
        fromEmail: process.env.SENDGRID_FROM_EMAIL,
        adminToEmail: process.env.SENDGRID_TO_EMAIL,
        clientToEmail: testData.email,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error: any) {
    console.error('SendGrid test error:', error)
    
    return NextResponse.json({ 
      error: 'Failed to run email test',
      details: error.message,
      code: error.code,
      statusCode: error.response?.status,
      body: error.response?.body,
      stack: error.stack
    }, { status: 500 })
  }
}
