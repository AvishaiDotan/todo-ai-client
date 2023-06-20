import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { PageRoute } from '@/Types';

const PageRouteHook = (): PageRoute  => {
	const location = useLocation();
	const [pageEnum, setPageEnum] = useState(PageRoute.home);

	useEffect(() => {

		if (location.pathname === '/boards') {
			setPageEnum(PageRoute.boards);
		} else if (location.pathname === '/home' && !location.pathname.includes("/todos")) {
			setPageEnum(PageRoute.home);
		} else if (location.pathname === '/completed')  {
			setPageEnum(PageRoute.completed);
		} else if (location.pathname.includes("/todos"))  {
			setPageEnum(PageRoute.todos);
		}
	}, [location]);

	return pageEnum;
};

export default PageRouteHook;

