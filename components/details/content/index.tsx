import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/horizontal"
import About from "./about"
import HowItWorks from "./how-it-works"
import Credits from "./credits"
import SupportedLanguages from "./supported-languages"
import HelpPayForOurServers from "./help-pay-for-our-servers"
import { VerticalTabs, VerticalTabsContent, VerticalTabsList, VerticalTabsTrigger } from "@/components/ui/tabs/vertical"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Content({ isDesktop }: { isDesktop: boolean }) {
  if (isDesktop) {
    return (
      <VerticalTabs className="h-full w-full" defaultValue="about">
        <VerticalTabsList className="flex flex-col">
          <VerticalTabsTrigger value="about">About</VerticalTabsTrigger>
          <VerticalTabsTrigger value="how-to-use">How to use?</VerticalTabsTrigger>
          <VerticalTabsTrigger value="supported-languages">Supported Languages</VerticalTabsTrigger>
          <VerticalTabsTrigger value="credits">Credits</VerticalTabsTrigger>
          <VerticalTabsTrigger value="help-pay-for-our-servers">Help Pay For Our Servers ;-;</VerticalTabsTrigger>
        </VerticalTabsList>
        <VerticalTabsContent className="h-full w-full" value="about">
          <About />
        </VerticalTabsContent>
        <VerticalTabsContent className="h-full w-full" value="how-to-use">
          <HowItWorks />
        </VerticalTabsContent>
        <VerticalTabsContent className="h-full w-full" value="supported-languages">
          <SupportedLanguages />
        </VerticalTabsContent>
        <VerticalTabsContent className="h-full w-full" value="credits">
          <Credits />
        </VerticalTabsContent>
        <VerticalTabsContent className="h-full w-full" value="help-pay-for-our-servers">
          <HelpPayForOurServers />
        </VerticalTabsContent>
      </VerticalTabs>
    )
  }
  return (
    <Tabs className="h-full w-full p-4" defaultValue="about">
      <TabsList>
        <Select defaultValue="about">
          <SelectTrigger className="w-[40vw]">
            <SelectValue placeholder="Select A Menu" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="flex flex-col gap-1">
              <TabsTrigger value="about">
                <SelectItem value="about">
                  About
                </SelectItem>
              </TabsTrigger>
              <TabsTrigger value="how-to-use">
                <SelectItem value="how-to-use">
                  How to use?
                </SelectItem>
              </TabsTrigger>
              <TabsTrigger value="supported-languages">
                <SelectItem value="supported-languages">
                  Supported Languages
                </SelectItem>
              </TabsTrigger>
              <TabsTrigger value="credits">
                <SelectItem value="credits">
                  Credits
                </SelectItem>
              </TabsTrigger>
              <TabsTrigger value="help-pay-for-our-servers">
                <SelectItem value="help-pay-for-our-servers">
                  Help Pay For Our Servers ;-;
                </SelectItem>
              </TabsTrigger>
            </SelectGroup>
          </SelectContent>
        </Select>
      </TabsList>
      <TabsContent className="h-full w-full" value="about">
        <About />
      </TabsContent>
      <TabsContent className="h-full w-full" value="how-to-use">
        <HowItWorks />
      </TabsContent>
      <TabsContent className="h-full w-full" value="supported-languages">
        <SupportedLanguages />
      </TabsContent>
      <TabsContent className="h-full w-full" value="credits">
        <Credits />
      </TabsContent>
      <TabsContent className="h-full w-full" value="help-pay-for-our-servers">
        <HelpPayForOurServers />
      </TabsContent>
    </Tabs>
  )
}
