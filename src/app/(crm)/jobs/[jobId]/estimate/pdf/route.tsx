import { getClient } from "@/lib/queries/getClient";
import { getJob } from "@/lib/queries/getJob";
import { Page, Text, View, Document, Image, StyleSheet, renderToStream } from "@react-pdf/renderer"
import { NextResponse } from "next/server";

export async function  GET(request: Request, { params }: { params: Promise<{jobId: string}> }) {

  const { jobId } = await params 
  const job = await getJob(Number(jobId))
  const client = await getClient(job.clientId)


  const styles = StyleSheet.create({
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: '5mm',
      borderBottomColor: '#3F451F',
      borderBottomWidth: '.5mm'
    },
    client: {
      margin: '5mm',
      paddingBottom: '5mm',
      paddingHorizontal: '2mm',
      display: 'flex',
      flexDirection: 'column',
      gap: '1mm',
      borderBottomColor: '#570F0D',
      borderBottomWidth: '.5mm'
      
    },
    job: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: '5mm',
      borderBottomColor: '#570F0D',
      borderBottomWidth: '.5mm',
      paddingHorizontal: '2mm',
      paddingBottom: '5mm'
    },
    jobInfo: {
      display: 'flex',
      flexDirection: 'row',
      gap: '1mm'
    },
    signature: {
      margin: '5mm'
    }
  })
    const currencyFormatter = new Intl.NumberFormat('default', {
      style: 'currency',
      currency: 'USD'
    })

  type Props = {
    clientName: string,
    address: string | null,
    city: string | null,
    state: string | null,
    zip: string | null,
    phone: string | null,
    title: string | null,
    bid: string | null,
    bidDate: Date | null,
    notes: string | null,
    signature: string,
    acceptedDate: Date | null
  }

  const Estimate = ({clientName, address, city, state, zip, phone, title, bid, bidDate, notes, signature, acceptedDate}: Props) => (
    <Document>
      <Page size="A4">
        {/* Header */}
        <View style={styles.header}>
          <View style={{width: "5cm", height: "5cm"}}>
            <Image
              src='/images/logo.png'
              />
          </View>
          <View style={{display: 'flex', flexDirection: 'column', gap: '3mm'}}>
            <Text>B.C. Trees llc.</Text>
            <View style={{fontSize: '5mm'}}>
              <Text>1113 IN-64, English, IN 47118</Text>
              <Text>812-572-1047</Text>
              <Text>briancoxtrees@gmail.com</Text>
            </View>
          </View>
        </View>

        {/* Client Info */}
        <View style={styles.client}>
          <Text style={{color: "#570F0D", fontWeight:'bold', marginBottom: '1mm'}}>Bill To:</Text>
          <Text>{clientName}</Text>
          {/* client details */}
          <View style={{fontSize: '5mm', display: 'flex', flexDirection: 'column', gap: '1mm'}}>
            <Text>{address}</Text>
            <View style={{display: 'flex', flexDirection: 'row', gap: '2mm'}}>
              <Text>{city}</Text>
              <Text>{state}</Text>
              <Text>{zip}</Text>
            </View>
            <Text>{phone}</Text>
          </View>
        </View>

        {/* Job Info */}
        <View style={styles.job}>

          <View style={{display: 'flex', flexDirection:'column', gap: '2mm'}}>
            <View style={styles.jobInfo}>
              <Text style={{color: '#570F0F'}}>Job:</Text>
              <Text>{title}</Text>
            </View>
            <View style={styles.jobInfo}>
              <Text style={{color: '#570F0F'}}>Estimate:</Text>
              <Text>{bid ? currencyFormatter.format(parseFloat(bid)) : 'estimate not given'}</Text>
            </View>
            <View style={styles.jobInfo}>
              <Text style={{color: '#570F0F'}}>Estimate Date:</Text>
              <Text>{bidDate ? bidDate.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).toString() : new Date().toLocaleString('en-US', {year: 'numeric', month:'long', day:'numeric'}).toString()}</Text>
            </View>
          </View>

          <View style={{display: 'flex', flexDirection: 'column', gap: '1mm'}}>
            <Text style={{color: '#570F0F'}}>Description:</Text>
            <Text style={{fontSize: '5mm'}}>{notes}</Text>
          </View>
        </View>

        {/* signature */}
        <View style={styles.signature}>
          <View style={{display: 'flex', flexDirection: 'row', gap: '1mm'}}>
            <Text>Signed:</Text>
            {signature && <Image src={signature}/>}
          </View>
          <View style={{display: 'flex', flexDirection: 'row', gap: '2mm', marginTop:'2mm'}}>
            <Text>Date:</Text>
            <Text>{acceptedDate ? acceptedDate.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).toString() : new Date().toLocaleString('en-US', {year: 'numeric', month:'long', day:'numeric'}).toString()}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )

  const rawFilename = job.title || `${client.firstName} ${client.lastName}`;
  const sanitizedFilename = rawFilename.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '_') + '.pdf';

  const stream = await renderToStream(<Estimate clientName={`${client.firstName} ${client.lastName}`} address={client.address1} city={client.city} state={client.state} zip={client.zip} phone={client.phone} title={job.title} bid={job.bidAmount} bidDate={job.bidDate} notes={job.notes} signature={job.signature ? job.signature : ''} acceptedDate={job.acceptedDate}/>)

  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${sanitizedFilename}"`    
    }
  })
}