import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  message: string;
};

export default function ContactEmail({
  name,
  email,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from {name}</Preview>
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f4f4f4" }}>
        <Container
          style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
        >
          <Section
            style={{
              backgroundColor: "#161513",
              padding: "24px",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <Heading style={{ color: "#E9E7E1", margin: 0 }}>
              New Contact Message
            </Heading>
          </Section>
          <Section
            style={{
              backgroundColor: "#E9E7E1",
              padding: "24px",
              borderRadius: "0 0 12px 12px",
            }}
          >
            <Text>
              <strong>Name:</strong> {name}
            </Text>
            <Text>
              <strong>Email:</strong> {email}
            </Text>
            <Section
              style={{
                backgroundColor: "white",
                padding: "16px",
                borderRadius: "8px",
                marginTop: "16px",
              }}
            >
              <Text style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                {message}
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
