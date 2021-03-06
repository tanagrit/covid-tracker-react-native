import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { ScreenParamList } from '@covid/features/ScreenParamList';
import { RegularText, ClickableText, RegularBoldText } from '@covid/components/Text';
import { CheckboxList, CheckboxItem } from '@covid/components/Checkbox';
import { openWebLink } from '@covid/utils/links';

import { HeaderText, SimpleTextBlock } from '../components/LegalComponents';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Consent'>;
  route: RouteProp<ScreenParamList, 'Consent'>;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConsentScreenSE: FC<PropsType> = ({ navigation, route, setAgreed }) => {
  const [participateChecked, setParticipateChecked] = useState(false);
  const [processingChecked, setProcessingChecked] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);

  const onInfoLinkPress = useCallback(() => openWebLink('https://Covid19app.lu.se'), []);

  const onPrivacyPolicyPress = useCallback(
    () => navigation.navigate('PrivacyPolicySV', { viewOnly: route.params.viewOnly }),
    [navigation.navigate, route.params.viewOnly]
  );

  const toggleParticipateChecked = useCallback(() => {
    setParticipateChecked(!participateChecked);
  }, [setParticipateChecked, participateChecked]);

  const toggleProcessingChecked = useCallback(() => {
    setProcessingChecked(!processingChecked);
  }, [setProcessingChecked, processingChecked]);

  const toggleAgreeChecked = useCallback(() => {
    setAgreeChecked(!agreeChecked);
  }, [setAgreeChecked, agreeChecked]);

  useEffect(() => {
    navigation.setOptions({ title: 'Information till studiedeltagare' });
  }, []);

  useEffect(() => {
    setAgreed(participateChecked && processingChecked && agreeChecked);
  }, [participateChecked, processingChecked, agreeChecked]);

  return (
    <ScrollView>
      <RegularText>
        Vi vill fr??ga dig om du vill delta i ett forskningsprojekt som handlar om covid-19. I det h??r dokumentet f??r du
        information om projektet och om vad det inneb??r att delta.
        {'\n\n'}
        Projektets titel ??r ???Nationellt initiativ f??r att via en app i realtid kartl??gga samh??llspridningen av covid-19
        i Sverige samt riskfaktorer f??r att drabbas av en allvarlig sjukdomsbild vid covid-19???, och forskningen ??r
        godk??nd av Etikpr??vningsmyndigheten i Sverige (DNR 2020-01803 och DNR 2020-04006).
        {'\n\n'}
      </RegularText>

      <HeaderText text="Vad ??r det f??r projekt och varf??r vill ni att jag ska delta?" />
      <SimpleTextBlock
        text={[
          'Syftet med det h??r projektet ??r att ??ka kunskapen om sjukdomen covid-19, som orsakas av coronaviruset SARS-CoV-2. V??rt m??l ??r att kartl??gga den snabba smittspridningen av covid-19 i landet, och ocks?? att unders??ka riskfaktorer f??r att drabbas av en mer allvarlig sjukdomsbild.',
          'I det h??r projektet kommer vi att anv??nda oss av en app: ???COVID Symptom Study??? som ??r gratis f??r anv??ndarna. I appen kan studiedeltagare/appanv??ndare anonymt fylla i en kort h??lsodeklaration och om huruvida de har n??gra symtom som skulle kunna tyda p?? att de har drabbats av covid-19, t.ex. feber eller hosta, samt uppge om de har f??r??ndrat sina levnadsvanor sedan pandemin br??t ut. Studiedeltagare som arbetar inom h??lso- och sjukv??rd kommer ocks?? att kunna uppge om de exponerats f??r smitta p?? sitt arbete. Data som samlas in fr??n alla appanv??ndare kan sedan analyseras p?? gruppniv?? f??r att unders??ka hur och var covid-19 sprids i landet. Vi kommer ocks?? att kunna se vad som h??nder med smittspridningen p?? sikt, och hur olika delar av landet p??verkas av nationella restriktioner g??llande t.ex. resande och antal personer som f??r delta i allm??nna sammankomster. Utifr??n informationen i h??lsodeklarationen kan vi ocks?? analysera vilka som verkar ha stor risk att drabbas av sv??rare symtom. Vi kommer ocks?? att kunna se om det verkar som om faktorer som p??verkar folkh??lsan i Sverige f??r??ndras av den p??g??ende pandemin. Vi kommer att samla in data s?? l??nge som covid-19 sprids i Sverige.',
          'Forskningshuvudman f??r projektet ??r Lunds universitet. Med forskningshuvudman menas den organisation som ??r ansvarig f??r studien.',
        ]}
      />

      <HeaderText text={'Hur g??r studien till?\n'} />
      <SimpleTextBlock
        text={[
          'Om du v??ljer att delta i studien kan du b??rja anv??nda appen COVID Symptom Study. Du kommer att d?? att f??rst svara p?? en kort h??lsodeklaration. Vi kommer att be om ditt postnummer f??r att kunna veta ditt ungef??rliga geografiska l??ge i Sverige (appen kommer dock inte att samla in n??gon GPS-data). Vi kommer ocks?? att fr??ga dig om du arbetar inom h??lso- och sjukv??rd, och om du g??r det kommer vi att fr??ga om du blivit exponerad f??r covid-19 p?? din arbetsplats och i s?? fall om du haft tillg??ng till skyddsutrustning. Du v??ljer sj??lv hur m??nga fr??gor du svarar p?? och vilka fr??gor du f??redrar att inte svara p??. Att svara p?? alla fr??gor tar ungef??r 10-15 minuter.',
          'Sedan kommer du att kunna svara p?? fr??gor om huruvida du har symtom av den typ som m??nga f??r vid covid-19, dvs t.ex. feber, hosta, andningssv??righeter och uttalad tr??tthet. Du kommer ocks?? att kunna fylla i om du har beh??vt upps??ka sjukv??rden f??r dina symtom, och om du blivit testad f??r covid-19. Du som arbetar inom sjukv??rden kan ocks?? uppdatera om du nyligen blivit exponerad f??r misst??nkt covid-19 p?? din arbetsplats. Du kommer att kunna uppdatera de h??r fr??gorna i appen dagligen, eller s?? ofta eller s??llan du vill, det tar ungef??r 1 minut per g??ng.',
          'Du ??r anonym n??r du deltar i studien och svarar p?? fr??gorna. Vi kommer inte fr??ga dig om ditt namn, ditt personnummer, din adress eller ditt telefonnummer. E-postadressen som du anv??nder f??r att skapa ett konto kommer inte att ing?? i forskningsdatabasen p?? Lunds universitet. Om du vill kommer du att kunna f?? push-notiser via appen, som p??minner om att svara p?? fr??gorna eller om vi vill informera alla anv??ndare om n??got. Du kan sj??lvklart v??lja att st??nga av push-notiserna. Fr??gorna i appen uppdateras i takt med att vi l??r oss mer om covid-19.',
          'Du v??ljer sj??lv hur l??nge du vill delta i studien och anv??nda appen. Du kan avsluta ditt deltagande n??r som helst och/eller avinstallera appen och vi kommer inte att fr??ga dig varf??r.',
          'Observera att du m??ste vara 18 ??r eller ??ldre f??r att delta i studien.',
          'Appen ??r utvecklad f??r att m??jligg??ra datainsamling fr??n m??nga anonyma anv??ndare. Den ger inte h??lsor??d, och ers??tter inte ordinarie kontakt med sjukv??rden. Du kommer inte heller kunna ta kontakt med sjukv??rdspersonal via appen.',
        ]}
      />

      <HeaderText text="M??jliga f??ljder och risker med att delta i studien" />
      <SimpleTextBlock
        text={[
          'Att svara p?? fr??gor om sin h??lsa skulle kunna upplevas som obehagligt f??r vissa, men det ??r aldrig obligatoriskt att svara p?? n??gon fr??ga, och du v??ljer alltid sj??lv hur mycket och hur l??nge du vill anv??nda appen. Eftersom du ??r anonym n??r du deltar kommer du inte att kunna identifieras eller kontaktas i studien, och risken f??r integritetsintr??ng ??r liten.',
          'Det finns inga direkta f??rdelar f??r dig av att delta i den h??r studien, och du kommer inte att kunna f?? personliga h??lsor??d eller personlig uppf??ljning via appen. Ditt deltagande kan d??remot bidra med mycket viktig kunskap om covidviruset.',
        ]}
      />

      <HeaderText text="Vad h??nder med mina uppgifter?" />
      <SimpleTextBlock
        text={[
          'Projektet kommer att samla in och registrera information om dig via appen COVID Symptom Study. ??ndam??let med informationsinsamlingen ??r att m??jligg??ra forskning p?? spridningen av covid-19 i den svenska befolkningen. Den r??ttsliga grunden f??r informationsinsamlingen ??r d??rmed allm??nt intresse.',
          'Appen COVID Symptom Study ??r utvecklad av forskare p?? King???s College i London, Guy???s Hospital och St Thomas Hospital i London, samt utvecklare p?? h??lsof??retaget Zoe Global Ltd i Storbritannien. Zoe Global Ltd kommer att ansvara f??r initial insamling av data fr??n COVID Symptom Study. Information fr??n de svenska anv??ndarna kommer sedan med s??ker fil??verf??ring och i krypterad form ??verf??ras till Lunds universitet.',
          'Lunds universitet kommer sedan att bygga upp en forskningsdatabas med informationen fr??n svenska anv??ndare av COVID Symptom Study. Forskningsdatabasen kommer att ligga p?? en s??ker server utan tillg??ng f??r icke auktoriserad personal eller andra utomst??ende. Tillg??ng till data kommer enbart att ges till utvalda forskare i projektet.',
          'Lunds universitet har ing??tt ett samarbetsavtal med Uppsala universitet inom ramen f??r COVID Symptom Study. Utvalda forskare p?? Uppsala universitet ing??r i forskningsprojektet COVID Symptom Study och Lunds universitet kommer att kunna dela data med dessa forskare p?? Uppsala universitet. Utvalda forskare vid andra akademiska institutioner i Sverige kan inom ramen f??r separata samarbetsavtal ocks?? komma att delta i analyser av data. Lunds universitet kommer fortsatt ha huvudansvar f??r samarbetet med Zoe Global Ltd samt f??r kontakter med studiedeltagarna.',
        ]}
      />
      <RegularText>
        All information som samlas in fr??n anv??ndarna via appen COVID Symptom Study kommer att sammanst??llas och
        analyseras p?? gruppniv??, och inga individuella karakteristika kommer att kunna identifieras. Resultaten fr??n
        sammanst??llningarna och analyserna kommer att skickas l??pande till Folkh??lsomyndigheten och andra myndigheter
        samt ansvariga inom h??lso- och sjukv??rd. Resultaten kommer ocks?? att publiceras l??pande p?? studiens hemsida (
        <ClickableText testID="infoLink1" onPress={onInfoLinkPress}>
          Covid19app.lu.se
        </ClickableText>
        ). Vi kommer ocks?? att publicera resultat p?? gruppniv?? i medicinska tidskrifter.
      </RegularText>
      <SimpleTextBlock
        text={[
          'Zoe Global Ltd ansvarar f??r datainsamling fr??n svenska anv??ndare i Sverige och f??r data i Storbritannien. Ansvarig f??r data fr??n svenska anv??ndare n??r den skickats fr??n Zoe Global Ltd till Lunds universitet i Sverige ??r forskningshuvudmannen Lunds universitet. Data kommer att sparas p?? Lunds universitet i minst 10 ??r efter den samlats in i enlighet med g??llande dataskyddslagstiftning. All datalagring och ??verf??ring i Sverige och i Storbritannien uppfyller de krav som st??lls av EU:s dataskyddsf??rordning 2016/679, ocks?? kallat GDPR (General Data Protection Regulation), och annan relevant lagstiftning.',
        ]}
      />
      <RegularText>
        Enligt EU:s dataskyddsf??rordning har du r??tt att kostnadsfritt f?? ta del av den information om dig som hanteras
        i studien, och vid behov f?? eventuella fel r??ttade. Du kan ocks?? beg??ra att information som du l??mnat raderas
        samt att behandlingen av dina personuppgifter begr??nsas. Detta kan du g??ra genom att e-posta till{' '}
        <RegularBoldText>leavecovidtracking-sweden@joinzoe.com</RegularBoldText> fr??n den e-postadress du anv??nt f??r att
        registrera dig i appen. Du kan ??ven ta bort dina uppgifter direkt i appens huvudmeny. Du kan ??ven kontakta
        ansvarig forskare i Sverige professor Paul Franks om du har fr??gor, se kontaktinformation nedan.
      </RegularText>
      <RegularText>
        Det finns ocks?? ett dataskyddsombud p?? Lunds universitet som n??s p??{' '}
        <RegularBoldText>dataskyddsombud@lu.se</RegularBoldText>. Om du ??r missn??jd med hur dina uppgifter behandlas har
        du ??ven r??tt att l??mna in klagom??l till Datainspektionen i Stockholm som ??r den aktuella tillsynsmyndigheten (
        <RegularBoldText>datainspektionen@datainspektionen.se</RegularBoldText>). Mer information om detta hittar du via{' '}
        <ClickableText
          testID="infoLink2"
          onPress={() =>
            openWebLink('https://www.datainspektionen.se/vagledningar/for-dig-som-privatperson/klagomal-och-tips/')
          }>
          https://www.datainspektionen.se/vagledningar/for-dig-som-privatperson/klagomal-och-tips/
        </ClickableText>
      </RegularText>

      <HeaderText text="Hur f??r jag information om resultatet i studien?" />
      <SimpleTextBlock
        text={[
          'Forskargruppen kommer att l??pande sammanst??lla och analysera resultat fr??n forskningsprojektet, och du kommer att kunna ta del av resultaten p?? studiens hemsida Covid19app.lu.se. Resultat kommer bara att visa information p?? gruppniv??, och ingen information kan h??rledas till just dig.',
        ]}
      />

      <HeaderText text="Ers??ttning och f??rs??kring" />
      <SimpleTextBlock
        text={[
          'Du kommer inte att f?? n??gon ers??ttning f??r ditt deltagande i studien, och du omfattas inte av n??gon speciell f??rs??kring n??r du deltar.',
        ]}
      />

      <HeaderText text="Deltagandet ??r frivilligt" />
      <SimpleTextBlock
        text={[
          'Ditt deltagande i studien ??r helt frivilligt och du kan n??r som helst v??lja att avbryta deltagandet. Om du v??ljer att inte delta eller vill avbryta ditt deltagande beh??ver du inte uppge varf??r. Om du vill avbryta ditt deltagande s?? kan du sj??lv sluta anv??nda eller avinstallera appen COVID Symptom Study.',
        ]}
      />

      <HeaderText text="Ansvarig f??r studien" />
      <SimpleTextBlock
        text={[
          'Ansvarig f??r studien ??r professor Paul Franks. Om du har n??gra ytterligare fr??gor g??llande studien s?? f??r du g??rna mejla honom p?? e-postadressen nedan:\n',
          'Professor Paul Franks',
          'Lunds universitet, CRC,',
          'Jan Waldenstr??ms gata 35, Malm??',
          'Tfn: 040-391149',
          'covid-symptom-study@med.lu.se',
        ]}
        separator={'\n'}
      />

      <HeaderText text="Samtycke till att delta i studien" />
      <RegularText>
        Jag har h??rmed l??st den skriftliga informationen om studien, och jag har haft m??jlighet att st??lla fr??gor via
        epost till den ansvariga forskaren. Om jag vill l??sa den skriftliga informationen igen s?? finns den p??{' '}
        <ClickableText testID="infoLink3" onPress={onInfoLinkPress}>
          Covid19app.lu.se
        </ClickableText>
        .
      </RegularText>

      {!route.params.viewOnly && (
        <CheckboxList>
          <CheckboxItem testID="partecipateCheck" value={participateChecked} onChange={toggleParticipateChecked}>
            Jag ??r 18 ??r eller ??ldre och jag samtycker till att delta i studien ???Nationellt initiativ f??r att via en app
            i realtid kartl??gga samh??llspridningen av covid-19 i Sverige samt riskfaktorer f??r att drabbas av en
            allvarlig sjukdomsbild vid covid-19???.
          </CheckboxItem>
          <CheckboxItem testID="processingCheck" value={processingChecked} onChange={toggleProcessingChecked}>
            Jag samtycker till att personuppgifter om mig behandlas p?? det s??tt som beskrivs i Informationen till
            studiedeltagare ovan.
          </CheckboxItem>
          <CheckboxItem testID="agreeCheck" value={agreeChecked} onChange={toggleAgreeChecked}>
            Jag har l??st och accepterar Zoe Global Ltds{' '}
            <ClickableText testID="privacyPolicy" onPress={onPrivacyPolicyPress}>
              integritetsmeddelande
            </ClickableText>
            .
          </CheckboxItem>
        </CheckboxList>
      )}
    </ScrollView>
  );
};

export default React.memo(ConsentScreenSE);
