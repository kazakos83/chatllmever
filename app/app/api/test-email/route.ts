
import { NextRequest, NextResponse } from 'next/server'
import { sendAdminNotification, sendClientAcknowledgment } from '@/lib/resend'

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    // Check if environment variables are set
    const config = {
      hasApiKey: !!process.env.RESEND_API_KEY,
      apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 10) + '...' || 'not set',
      fromEmail: 'info@everguardgroup.com.au',
      toEmail: 'info@everguardgroup.com.au'
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ 
        error: 'RESEND_API_KEY is missing',
        message: 'Please configure your Resend API key in the environment variables',
        config
      }, { status: 400 })
    }

    // Test both admin and client emails
    const testData = {
      name: 'Test User',
      email: 'info@everguardgroup.com.au', // Send client email to your address for testing
      phone: '1300 718 760',
      service: 'Surveillance Services',
      message: 'This is a test submission to verify email functionality with Resend.',
      inquiryId: 'TEST-' + Date.now()
    }

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
      message: 'Email tests completed successfully with Resend',
      config,
      results: {
        adminEmail: {
          success: !!adminResult.data?.id,
          messageId: adminResult.data?.id || null,
          error: adminResult.error || null
        },
        clientEmail: {
          success: !!clientResult.data?.id,
          messageId: clientResult.data?.id || null,
          error: clientResult.error || null
        }
      },
      testData: {
        fromEmail: 'info@everguardgroup.com.au',
        adminToEmail: 'info@everguardgroup.com.au',
        clientToEmail: testData.email,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error: any) {
    console.error('Resend test error:', error)
    
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
