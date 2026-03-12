import {
  Box,
  Flex,
  Group,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  rem,
} from '@mantine/core'
import {
  createFileRoute,
  Link,
  linkOptions,
  Outlet,
  useRouterState,
} from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import AdminRegistriesIcon from '@/assets/svgs/admin-registries-nav.svg?react'
import AdminReplicationsIcon from '@/assets/svgs/admin-replications-nav.svg?react'
import AdminUsersIcon from '@/assets/svgs/admin-users-nav.svg?react'
import SettingsIcon from '@/assets/svgs/settings.svg?react'
import { Route as AdminRegistriesRoute } from '@/routes/(auth)/admin/registries'
import { Route as AdminReplicationsRoute } from '@/routes/(auth)/admin/replications'
import { Route as AdminUsersRoute } from '@/routes/(auth)/admin/users'

export const Route = createFileRoute('/(auth)/admin')({
  component: AdminLayout,
  staticData: {
    navName: 'Admin',
  },
})

function AdminNavbar() {
  const { t } = useTranslation()
  const activeRouteIds = useRouterState({
    select: state => state.matches.map(match => match.routeId),
  })
  const navRoutes = linkOptions([
    {
      id: AdminUsersRoute.id,
      label: t('admin.users'),
      icon: AdminUsersIcon,
      to: AdminUsersRoute.to,
    },
    {
      id: AdminRegistriesRoute.id,
      label: t('admin.registries'),
      icon: AdminRegistriesIcon,
      to: AdminRegistriesRoute.to,
    },
    {
      id: AdminReplicationsRoute.id,
      label: t('admin.replications'),
      icon: AdminReplicationsIcon,
      to: AdminReplicationsRoute.to,
    },
  ])

  return (
    <ScrollArea
      type="scroll"
      offsetScrollbars="y"
      style={{ flex: 1 }}
    >
      <Stack gap={12} pb={20}>
        {navRoutes.map((route) => {
          const Icon = route.icon
          const isActive = activeRouteIds.includes(route.id)

          return (
            <NavLink
              key={route.to}
              label={route.label}
              leftSection={<Icon fontSize={16} />}
              component={Link}
              to={route.to}
              active={isActive}
              h={32}
              fs="sm"
              bdrs="sm"
              styles={{
                label: {
                  whiteSpace: 'nowrap',
                },
              }}
            />
          )
        })}
      </Stack>
    </ScrollArea>
  )
}

function AdminLayout() {
  const { t } = useTranslation()

  return (
    <Flex
      align="stretch"
      gap={0}
      h="100%"
    >
      <Stack
        component="nav"
        gap={20}
        w={220}
        miw={220}
        h="100%"
        px={16}
        style={{
          borderInlineEnd: '1px solid var(--mantine-color-default-border)',
        }}
      >
        {/* FIXME: color: Gray80 */}
        <Group
          gap={6}
          h={30}
          wrap="nowrap"
          pl={4}
          c="gray.7"
        >
          <SettingsIcon
            width={30}
          />
          <Text
            size="md"
            fw={600}
            lh={rem(24)}
          >
            {t('nav.settings')}
          </Text>
        </Group>

        <AdminNavbar />
      </Stack>

      <Box
        flex={1}
        px="md"
      >
        <Outlet />
      </Box>
    </Flex>
  )
}
